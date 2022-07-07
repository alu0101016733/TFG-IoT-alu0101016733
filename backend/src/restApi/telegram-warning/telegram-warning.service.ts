import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegramWarningSubscriptionView } from 'src/entity/views/TelegramWarningSubscriptionView';
import { Repository } from 'typeorm';

@Injectable()
export class TelegramWarningService {
  constructor(
    @InjectRepository(TelegramWarningSubscriptionView)
    private telegramSubscription: Repository<TelegramWarningSubscriptionView>,
  ) {}

  findAll(warningId: number) {
    return this.telegramSubscription.findBy({ warningId: warningId });
  }
}
