import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from 'src/entity/Sensor';
import { HistoryModule } from './history/history.module';
import { HistoryAulaModule } from './history-aula/history-aula.module';

@Module({
  controllers: [SensorController],
  providers: [SensorService],
  imports: [
    TypeOrmModule.forFeature([Sensor]),
    HistoryModule,
    HistoryAulaModule,
  ],
})
export class SensorModule {}
