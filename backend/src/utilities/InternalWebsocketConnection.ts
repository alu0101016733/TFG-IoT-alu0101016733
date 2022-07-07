import { Logger } from '@nestjs/common';
import { PORT } from 'src/main';
import * as ws from 'ws';

const voidMessageFunction = (data: any) => {};

export class InternalWebsocketConnection {
  private ws;
  private path = '';
  private logger: Logger = new Logger('InternalWebsocketConnection');
  private messageFunction = undefined;

  constructor(
    path: string,
    messageFunction: (data: any) => void = voidMessageFunction,
  ) {
    this.path = path;
    this.messageFunction = messageFunction;
    setTimeout(this.createWebsocket.bind(this), 1000);
  }

  private createWebsocket() {
    this.ws = new ws(`ws://localhost:${PORT}/${this.path}`);

    this.ws.on('error', this.errorHandler.bind(this));
    this.ws.on('open', this.connectionHandler.bind(this));
    this.ws.on('message', this.message.bind(this));
  }

  private errorHandler(error: any) {
    this.logger.warn(error);
    // delete websocket and retry in half a second
    if (error.code === 'ECONNREFUSED') {
      this.ws = undefined;
      setTimeout(this.createWebsocket.bind(this), 500);
    }
  }

  message(data) {
    this.messageFunction(JSON.parse(data.toString()));
  }

  private connectionHandler() {
    this.logger.log(`Connection to ${this.path} established`);
  }

  send(data: string) {
    this.ws.send(data);
  }
}
