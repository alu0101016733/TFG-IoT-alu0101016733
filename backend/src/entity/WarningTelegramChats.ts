import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './Department';
import { Device } from './Device';
import { History } from './History';
import { Sensor } from './Sensor';
import { TelegramChats } from './TelegramChats';
import { Warning } from './Warning';

@Entity()
export class WarningTelegramChats {
  @PrimaryColumn()
  chatId: number;
  @JoinColumn({ name: 'chatId' })
  @ManyToOne(() => TelegramChats, (chats) => chats.chatId)
  chats: TelegramChats;

  @PrimaryColumn()
  warningId: number;
  @JoinColumn({ name: 'warningId' })
  @ManyToOne(() => Warning, (warning) => warning.id)
  warnings: Warning;
}
