import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Device } from 'src/entity/Device';
import { DeviceView } from 'src/entity/views/DeviceView';
import { Repository } from 'typeorm';
import { DeviceDto } from './dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private device: Repository<Device>,
  ) {}

  create(aulaId: number, currentData: DeviceDto) {
    return this.device.insert({
      eui: currentData.deviceEui,
      description: currentData.description,
      type: currentData.deviceTypeId,
      aula: aulaId,
    });
  }

  findAll(aulaId: number) {
    return this.device.findBy({ aula: aulaId });
  }

  update(
    aulaId: number,
    deviceEui: string,
    currentData: Pick<DeviceDto, 'description'>,
  ) {
    //console.log('AAAA -> ', aulaId, deviceEui, currentData);
    return this.device.update(deviceEui, {
      aula: aulaId,
      description: currentData.description,
    });
  }

  async remove(aulaId: number, deviceEui: string) {
    await this.device.delete({ aula: aulaId, eui: deviceEui });
  }
}
