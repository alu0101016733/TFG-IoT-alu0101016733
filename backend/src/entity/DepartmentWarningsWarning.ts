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
import { Warning } from './Warning';

@Entity()
export class DepartmentWarningsWarning {
  @PrimaryColumn()
  department: number;
  @JoinColumn({ name: 'department' })
  @ManyToOne(() => Department, (department) => department.id)
  departments: Department;

  @PrimaryColumn()
  warning: number;
  @JoinColumn({ name: 'warning' })
  @ManyToOne(() => Warning, (warning) => warning.id)
  warnings: Warning;
}
