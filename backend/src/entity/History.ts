import { ApiProperty } from '@nestjs/swagger';
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
import { Sensor } from './Sensor';
import { TriggeredWarning } from './TriggeredWarning';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'bigint', default: () => 'FLOOR(UNIX_TIMESTAMP()*1000)' }) // https://mariadb.com/kb/en/unix_timestamp/
  currentTime: number;

  @ApiProperty()
  @Column({ type: 'bigint', default: null })
  triggeredTime: number;

  @ApiProperty()
  @Column({ type: 'float', default: null })
  value: number;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  deviceId: string;
  @JoinColumn({ name: 'deviceId' })
  @ManyToOne(() => Device, (device) => device.eui)
  device: Device;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  sensorId: string;
  @JoinColumn({ name: 'sensorId' })
  @ManyToOne(() => Sensor, (sensor) => sensor.id)
  sensor: Sensor;

  @OneToMany(
    () => TriggeredWarning,
    (triggeredWarning) => triggeredWarning.historyId,
  )
  warning: TriggeredWarning;
}
