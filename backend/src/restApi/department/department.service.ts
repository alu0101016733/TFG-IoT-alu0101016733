import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Department } from 'src/entity/Department';

@Injectable()
export class DepartmentService extends TypeOrmCrudService<Department> {
  constructor(@InjectRepository(Department) repo) {
    super(repo);
  }
}
