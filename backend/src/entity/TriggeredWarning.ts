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
import { Device } from './Device';
import { History } from './History';
import { Sensor } from './Sensor';
import { Warning } from './Warning';

@Entity()
export class TriggeredWarning {
  @PrimaryColumn()
  historyId: number;
  @JoinColumn({ name: 'historyId' })
  @ManyToOne(() => History, (history) => history.id)
  history: History[];

  @PrimaryColumn()
  warningId: number;
  @JoinColumn({ name: 'warningId' })
  @ManyToOne(() => Warning, (warning) => warning.id, { onDelete: 'CASCADE' })
  warning: Warning;
}
