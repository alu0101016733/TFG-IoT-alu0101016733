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

@WebSocketGateway({ path: '/alert' })
export class WsAlertGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private clients: Socket[] = [];

  private logger: Logger = new Logger('AlertGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized Alert Websocket');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected to alert: ${client}`);
    //console.log(client);
    this.clients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('client disconeccted');
  }

  @SubscribeMessage('broadcastToEveryone')
  broadcastToEveryone(client: Socket, payload: any): void {
    this.logger.log('emit alert broadcast');
    this.clients.forEach((client) => {
      client.send(JSON.stringify(payload));
    });
  }
}
