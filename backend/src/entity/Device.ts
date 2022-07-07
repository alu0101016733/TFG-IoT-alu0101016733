import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Aula } from './Aula';
import { DeviceType } from './DeviceType';
import { History } from './History';

@Entity()
export class Device {
  @PrimaryColumn({
    length: 50,
  })
  eui: string;

  @Column({
    default: null,
  })
  description: string;

  @Column({ nullable: false })
  type: number;
  @JoinColumn({ name: 'type' })
  @ManyToOne(() => DeviceType, (deviceType) => deviceType.id)
  owner: DeviceType;

  @Column({ nullable: false })
  aula: number;
  @JoinColumn({ name: 'aula' })
  @ManyToOne(() => Aula, (aula) => aula.id)
  owner1: Aula;

  @OneToMany(() => History, (history) => history.id)
  history: History[];
}
