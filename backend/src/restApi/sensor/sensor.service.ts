import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sensor } from 'src/entity/Sensor';

@Injectable()
export class SensorService extends TypeOrmCrudService<Sensor> {
  constructor(@InjectRepository(Sensor) repo) {
    super(repo);
  }
}
