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
import { Aula } from 'src/entity/Aula';
import { DepartmentService } from '../department.service';
import { AulaService } from './aula.service';

@Crud({
  model: {
    type: Aula,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
  query: {
    join: {
      department: {
        alias: 'department',
      },
    },
  },
  params: {
    departmentId: {
      field: 'departmentId',
      type: 'number',
    },
  },
})
@Controller('department/:departmentId/aula')
export class AulaController implements CrudController<Aula> {
  constructor(public service: AulaService) {}
}
