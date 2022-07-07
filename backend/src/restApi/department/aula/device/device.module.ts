import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from 'src/entity/Aula';
import { Device } from 'src/entity/Device';
import { DeviceView } from 'src/entity/views/DeviceView';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService],
  imports: [TypeOrmModule.forFeature([Device])],
})
export class DeviceModule {}
