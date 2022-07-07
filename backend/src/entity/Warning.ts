import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Aula } from './Aula';
import { AulaWarningsWarning } from './AulaWarningsWarning';
import { Department } from './Department';
import { DepartmentWarningsWarning } from './DepartmentWarningsWarning';
import { Sensor } from './Sensor';
import { TriggeredWarning } from './TriggeredWarning';
import { WarningTelegramChats } from './WarningTelegramChats';

@Entity()
export class Warning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    default: null,
  })
  description: string;

  @Column({
    default: 'Warning was triggered',
  })
  message: string;

  @Column({ type: 'float' })
  max: number;

  @Column({ type: 'float' })
  min: number;

  @Column()
  sensorId: string;
  @JoinColumn({ name: 'sensorId' })
  @ManyToOne(() => Sensor, (sensor) => sensor.id)
  sensors: Sensor[];

  @OneToMany(() => AulaWarningsWarning, (aulaWarning) => aulaWarning.aula)
  aulas: AulaWarningsWarning[];

  @OneToMany(
    () => DepartmentWarningsWarning,
    (departmentWarning) => departmentWarning.department,
  )
  departments: DepartmentWarningsWarning[];

  @OneToMany(() => WarningTelegramChats, (chat) => chat.warningId)
  chats: WarningTelegramChats[];

  @OneToMany(
    () => TriggeredWarning,
    (triggeredWarning) => triggeredWarning.historyId,
  )
  warning: TriggeredWarning;
}
