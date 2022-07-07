import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeviceType } from 'src/entity/DeviceType';

@Injectable()
export class DeviceTypesService extends TypeOrmCrudService<DeviceType> {
  constructor(@InjectRepository(DeviceType) repo) {
    super(repo);
  }
}
