import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramChats } from 'src/entity/TelegramChats';
import { WarningModule } from './warning/warning.module';

@Module({
  controllers: [TelegramController],
  providers: [TelegramService],
  imports: [TypeOrmModule.forFeature([TelegramChats]), WarningModule],
})
export class TelegramModule {}
