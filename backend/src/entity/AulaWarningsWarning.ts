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
import { Aula } from './Aula';
import { Device } from './Device';
import { History } from './History';
import { Sensor } from './Sensor';
import { Warning } from './Warning';

@Entity()
export class AulaWarningsWarning {
  @PrimaryColumn()
  aula: number;
  @JoinColumn({ name: 'aula' })
  @ManyToOne(() => Aula, (aula) => aula.id)
  aulas: Aula;

  @PrimaryColumn()
  warning: number;
  @JoinColumn({ name: 'warning' })
  @ManyToOne(() => Warning, (warning) => warning.id)
  warnings: Warning;
}
