import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegramWarningSubscriptionView } from 'src/entity/views/TelegramWarningSubscriptionView';
import { WarningTelegramChats } from 'src/entity/WarningTelegramChats';
import { Repository } from 'typeorm';
import { CreateWarningDto } from './dto/create-warning.dto';

@Injectable()
export class WarningService {
  constructor(
    @InjectRepository(WarningTelegramChats)
    private warningTelegram: Repository<WarningTelegramChats>,
    @InjectRepository(TelegramWarningSubscriptionView)
    private telegramSubscription: Repository<TelegramWarningSubscriptionView>,
  ) {}

  create(chatId: number, createWarningDto: any) {
    return this.warningTelegram.insert({
      chatId: chatId,
      warningId: createWarningDto.warningId,
    });
  }

  findAll(chatId: number) {
    return this.telegramSubscription.findBy({ chatId: chatId });
  }

  async remove(chatId: number, warningId: number) {
    await this.warningTelegram.delete({ chatId: chatId, warningId: warningId });
  }
}
