import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';

@Module({
  imports: [HttpModule],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
