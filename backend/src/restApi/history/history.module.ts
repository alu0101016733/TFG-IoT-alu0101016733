import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { History } from 'src/entity/History';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [TypeOrmModule.forFeature([History])],
})
export class HistoryModule {}
