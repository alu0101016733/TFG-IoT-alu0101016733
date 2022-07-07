import { Module } from '@nestjs/common';
import { WarningService } from './warning.service';
import { WarningController } from './warning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarningTelegramChats } from 'src/entity/WarningTelegramChats';
import { TelegramWarningSubscriptionView } from 'src/entity/views/TelegramWarningSubscriptionView';

@Module({
  controllers: [WarningController],
  providers: [WarningService],
  imports: [
    TypeOrmModule.forFeature([WarningTelegramChats]),
    TypeOrmModule.forFeature([TelegramWarningSubscriptionView]),
  ],
})
export class WarningModule {}
