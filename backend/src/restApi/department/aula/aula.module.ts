import { Module } from '@nestjs/common';
import { AulaService } from './aula.service';
import { AulaController } from './aula.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from 'src/entity/Aula';
import { DeviceModule } from './device/device.module';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  controllers: [AulaController],
  providers: [AulaService],
  imports: [TypeOrmModule.forFeature([Aula]), DeviceModule, SensorsModule],
})
export class AulaModule {}
