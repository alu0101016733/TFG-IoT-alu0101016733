import { ApiProperty } from '@nestjs/swagger';
import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { Aula } from '../Aula';
import { Department } from '../Department';
import { Device } from '../Device';
import { History } from '../History';
import { Sensor } from '../Sensor';
import { TelegramChats } from '../TelegramChats';
import { TriggeredWarning } from '../TriggeredWarning';
import { Warning } from '../Warning';
import { WarningTelegramChats } from '../WarningTelegramChats';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('warningTelegram.warningId', 'warningId')
      .addSelect('warningTelegram.chatId', 'chatId')
      .addSelect('warning.name', 'warningName')
      .addSelect('telegram.name', 'chatName')
      .addSelect('telegram.chatId', 'channelId')
      .from(WarningTelegramChats, 'warningTelegram')
      .innerJoin(Warning, 'warning', 'warning.id = warningTelegram.warningId')
      .innerJoin(
        TelegramChats,
        'telegram',
        'telegram.id = warningTelegram.chatId',
      ),
})
export class TelegramWarningSubscriptionView {
  @ViewColumn()
  warningId: number;

  @ViewColumn()
  warningName: string;

  @ViewColumn()
  chatId: number;

  @ViewColumn()
  channelId: number;

  @ViewColumn()
  chatName: string;
}
