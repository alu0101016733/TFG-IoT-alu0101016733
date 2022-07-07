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
import { DeviceType } from './DeviceType';
import { History } from './History';
import { Sensor } from './Sensor';
import { Warning } from './Warning';

@Entity()
export class DeviceTypeSensorsSensor {
  @PrimaryColumn()
  deviceType: number;
  @JoinColumn({ name: 'deviceType' })
  @ManyToOne(() => DeviceType, (deviceType) => deviceType.id)
  deviceTypes: DeviceType;

  @PrimaryColumn()
  sensor: string;
  @JoinColumn({ name: 'sensor' })
  @ManyToOne(() => Sensor, (sensor) => sensor.id)
  sensors: Sensor;
}
