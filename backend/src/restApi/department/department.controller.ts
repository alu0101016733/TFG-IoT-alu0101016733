import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Department } from 'src/entity/Department';
import { DepartmentService } from './department.service';

@Crud({
  model: {
    type: Department,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('department')
export class DepartmentController implements CrudController<Department> {
  constructor(public service: DepartmentService) {}
}
