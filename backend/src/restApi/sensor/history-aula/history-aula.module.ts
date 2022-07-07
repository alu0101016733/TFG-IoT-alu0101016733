import { Module } from '@nestjs/common';
import { HistoryAulaService } from './history-aula.service';
import { HistoryAulaController } from './history-aula.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/entity/History';
import { Sensor } from 'src/entity/Sensor';
import { HistoryView } from 'src/entity/views/HistoryView';

@Module({
  controllers: [HistoryAulaController],
  providers: [HistoryAulaService],
  imports: [TypeOrmModule.forFeature([HistoryView]), Sensor],
})
export class HistoryAulaModule {}
