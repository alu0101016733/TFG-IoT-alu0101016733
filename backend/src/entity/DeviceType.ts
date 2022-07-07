import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from './Device';
import { DeviceTypeSensorsSensor } from './DeviceTypeSensorsSensor';
import { Sensor } from './Sensor';

@Entity()
export class DeviceType {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    length: 50,
  })
  brand: string;

  @ApiProperty()
  @Column({
    length: 50,
  })
  model: string;

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

  @OneToMany(() => Device, (device) => device.eui, { cascade: true })
  devices: Device[];

  @OneToMany(
    () => DeviceTypeSensorsSensor,
    (deviceSensor) => deviceSensor.deviceTypes,
  )
  deviceTypes: DeviceTypeSensorsSensor[];
}
