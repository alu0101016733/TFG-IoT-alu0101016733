import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

type socketSubscriber = {
  socket: Socket;
  device?: string;
  sensor?: string;
  aula?: number;
};

@WebSocketGateway({ path: '/sensor' })
export class WsSensorGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private clients: socketSubscriber[] = [];
  private logger: Logger = new Logger('WsSensor');

  constructor() {}

  afterInit(server: Server) {
    this.logger.log('Initialized Sensor Websocket');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected to sensor: ${client}`);
    //this.clients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('client disconeccted');
  }

  @SubscribeMessage('subscribe')
  subscribeToSensor(client: Socket, payload: any): void {
    const subsribeTo = JSON.parse(payload);
    this.logger.log(`Client subscribed to: ${payload}`);
    this.clients.push({
      socket: client,
      device: subsribeTo.device,
      sensor: subsribeTo.sensor,
      aula: subsribeTo.aula,
    });
  }

  @SubscribeMessage('getInitialValues')
  getInitialValues(client: Socket, payload: any): WsResponse<string> {
    this.logger.log('hello from client');
    return { event: 'initialValues', data: 'Hello world!' };
  }

  @SubscribeMessage('broadcastToEveryone')
  broadcastToEveryone(
    client: Socket = undefined,
    payload: any = undefined,
  ): void {
    // console.log(payload);
    const sensorData = JSON.parse(payload);
    const deadClients = [];
    const dataToBeSend = JSON.stringify({
      event: 'sensorData',
      data: sensorData,
    });
    //this.logger.log('emit broadcast');
    this.clients.forEach((client, index) => {
      // remove dead clients from subscriber array
      // @ts-ignore
      if (client.socket._socket._readableState.closed) {
        deadClients.push(index);
      } else {
        // when defined, it has to match, if not just send the data
        if (
          (client.aula ? sensorData.aulaId === client.aula : true) &&
          (client.device ? client.device === sensorData.deviceId : true) &&
          (client.sensor ? client.sensor === sensorData.sensorId : true)
        ) {
          client.socket.send(dataToBeSend);
        }
      }
    });
    for (var i = deadClients.length - 1; i >= 0; i--) {
      this.clients.splice(deadClients[i], 1);
    }
  }
}
