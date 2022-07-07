import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { SensorsService } from './sensors.service';

@Controller('/department/:departmentId/aula/:aulaId/sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get()
  @ApiParam({ name: 'departmentId', type: 'number' })
  @ApiParam({ name: 'aulaId', type: 'number' })
  findAll(
    @Param('departmentId') departmentId: number,
    @Param('aulaId') aulaId: number,
  ) {
    return this.sensorsService.findAll(departmentId, aulaId);
  }
}
