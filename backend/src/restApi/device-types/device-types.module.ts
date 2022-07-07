import { Module } from '@nestjs/common';
import { DeviceTypesService } from './device-types.service';
import { DeviceTypesController } from './device-types.controller';
import { SensorModule } from './sensor/sensor.module';
import { DeviceType } from 'src/entity/DeviceType';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DeviceTypesController],
  providers: [DeviceTypesService],
  imports: [TypeOrmModule.forFeature([DeviceType]), SensorModule],
})
export class DeviceTypesModule {}
