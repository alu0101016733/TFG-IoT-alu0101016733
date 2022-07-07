import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Aula } from './Aula';
import { AulaWarningsWarning } from './AulaWarningsWarning';
import { DepartmentWarningsWarning } from './DepartmentWarningsWarning';
import { Warning } from './Warning';
import { WarningTelegramChats } from './WarningTelegramChats';

@Entity()
export class TelegramChats {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'bigint', name: 'chatId', unique: true })
  chatId: number;

  @ApiProperty()
  @Column({
    length: 50,
  })
  name: string;

  @ApiProperty()
  @Column({
    default: null,
  })
  description: string;

  @OneToMany(() => WarningTelegramChats, (chat) => chat.chatId)
  chats: WarningTelegramChats[];
}
