import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { SensorInAulaView } from 'src/entity/views/SensorInAulaView';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SensorsController],
  providers: [SensorsService],
  imports: [TypeOrmModule.forFeature([SensorInAulaView])],
})
export class SensorsModule {}
