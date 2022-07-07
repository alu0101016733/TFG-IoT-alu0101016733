import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorInAulaView } from 'src/entity/views/SensorInAulaView';
import { Repository } from 'typeorm';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(SensorInAulaView)
    private sensorInAula: Repository<SensorInAulaView>,
  ) {}
  findAll(departmentId: number, aulaId: number) {
    return this.sensorInAula.findBy({
      departmentId: departmentId,
      aulaId: aulaId,
    });
  }
}
