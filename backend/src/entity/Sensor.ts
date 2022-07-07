import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { DeviceType } from './DeviceType';
import { Warning } from './Warning';
import { History } from './History';
import { DeviceTypeSensorsSensor } from './DeviceTypeSensorsSensor';

@Entity()
export class Sensor {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    default: null,
  })
  description: string;

  @Column({
    length: 50,
  })
  symbol: string;

  @Column({ type: 'float' })
  base: number;

  @OneToMany(() => DeviceTypeSensorsSensor, (sensor) => sensor.sensors)
  sensors: DeviceTypeSensorsSensor[];

  @OneToMany(() => Warning, (warning) => warning.id, { cascade: true })
  warnings: Warning[];

  @OneToMany(() => History, (history) => history.id, { cascade: true })
  history: History[];
}
