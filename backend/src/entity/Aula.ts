import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AulaWarningsWarning } from './AulaWarningsWarning';
import { Department } from './Department';
import { Device } from './Device';
import { Warning } from './Warning';

@Entity()
export class Aula {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ApiProperty()
  @Column({ nullable: false })
  departmentId: number;
  @JoinColumn({ name: 'departmentId' })
  @ManyToOne(() => Department, (department) => department.aulas)
  department: Department;

  @OneToMany(() => Device, (device) => device.eui, { cascade: true })
  devices: Device[];

  @OneToMany(() => AulaWarningsWarning, (aulaWarning) => aulaWarning.aula)
  aulas: AulaWarningsWarning[];
}
