import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { AulaModule } from './aula/aula.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entity/Department';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [TypeOrmModule.forFeature([Department]), AulaModule],
})
export class DepartmentModule {}
