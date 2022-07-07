import { Module } from '@nestjs/common';
import { TelegramWarningService } from './telegram-warning.service';
import { TelegramWarningController } from './telegram-warning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramWarningSubscriptionView } from 'src/entity/views/TelegramWarningSubscriptionView';

@Module({
  controllers: [TelegramWarningController],
  providers: [TelegramWarningService],
  imports: [TypeOrmModule.forFeature([TelegramWarningSubscriptionView])],
})
export class TelegramWarningModule {}
