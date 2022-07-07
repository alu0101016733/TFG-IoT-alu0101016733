import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { InternalWebsocketConnection } from 'src/utilities/InternalWebsocketConnection';
import { HttpService } from '@nestjs/axios';
import { PORT } from 'src/main';
import { TELEGRAM_BOT_TOKEN } from 'conectionVariables';

@Injectable()
export class TelegramBotService {
  private TOKEN = TELEGRAM_BOT_TOKEN;
  private telegramBot = undefined;
  private websocket = undefined;
  private API_LINK = `http://localhost:${PORT}/telegram-warning`;

  constructor(private httpService: HttpService) {
    this.websocket = new InternalWebsocketConnection(
      'alert',
      this.messageHandler.bind(this),
    );
    this.telegramBot = new TelegramBot(this.TOKEN, { polling: true });

    this.telegramBot.on('message', (msg) => {
      const chatId = msg.chat.id;
      console.log('Received Message from: ', chatId);
      this.telegramBot.sendMessage(chatId, 'Received your message');
    });
  }

  async messageHandler(data) {
    const channels = await this.getChannelIds(data.warningId);
    channels.forEach((current) => {
      let message = `NEW ALERT
Department: ${data.department}
Aula: ${data.aula}
Min, Max of sensor: ${data.min}, ${data.max}
Value: ${data.value}`;
      this.telegramBot.sendMessage(current.channelId, message);
      //this.telegramBot.sendMessage(current.channelId, JSON.stringify(data));
    });
    //console.log(data);
    // this.telegramBot.sendMessage('540512694', JSON.stringify(data));
    //this.telegramBot.sendMessage("-734312691", JSON.stringify(data));
  }

  async getChannelIds(warningId) {
    try {
      const result = await this.httpService.axiosRef({
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8', // Indicates the content
        },
        url: `${this.API_LINK}/${warningId}`,
        data: JSON.stringify({}),
      });
      return result.data;
    } catch (error) {
      console.log('Inside catched error');
      console.log(error);
      return [];
    }
  }
}
