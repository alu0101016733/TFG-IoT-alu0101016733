import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/entity/History';
import { Sensor } from 'src/entity/Sensor';
import { HistoryView } from 'src/entity/views/HistoryView';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [TypeOrmModule.forFeature([HistoryView]), Sensor],
})
export class HistoryModule {}
