import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Aula } from './Aula';
import { AulaWarningsWarning } from './AulaWarningsWarning';
import { DepartmentWarningsWarning } from './DepartmentWarningsWarning';
import { Warning } from './Warning';

@Entity()
export class Department {
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

  @OneToMany(() => Aula, (aula) => aula.id, { cascade: true })
  aulas: Aula[];

  @OneToMany(
    () => DepartmentWarningsWarning,
    (departmentWarning) => departmentWarning.department,
  )
  departments: DepartmentWarningsWarning[];
}
