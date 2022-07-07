import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TelegramWarningService } from './telegram-warning.service';

@Controller('telegram-warning')
export class TelegramWarningController {
  constructor(
    private readonly telegramWarningService: TelegramWarningService,
  ) {}

  @Get(':warningId')
  findOne(@Param('warningId') warningId: number) {
    return this.telegramWarningService.findAll(warningId);
  }
}
