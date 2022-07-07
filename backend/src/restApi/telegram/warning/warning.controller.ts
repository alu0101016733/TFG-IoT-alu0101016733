import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WarningService } from './warning.service';
import { CreateWarningDto } from './dto/create-warning.dto';
import { ApiBody, ApiParam, ApiProperty } from '@nestjs/swagger';

@Controller('telegram/:chatId/warning')
export class WarningController {
  constructor(private readonly warningService: WarningService) {}

  @Post()
  @ApiParam({ name: 'chatId', type: 'number' })
  create(
    @Param('chatId') chatId: number,
    @Body() createWarningDto: CreateWarningDto,
  ) {
    return this.warningService.create(chatId, createWarningDto);
  }

  @Get()
  @ApiParam({ name: 'chatId', type: 'number' })
  findAll(@Param('chatId') chatId: number) {
    return this.warningService.findAll(chatId);
  }

  @Delete(':warningId')
  @ApiParam({ name: 'chatId', type: 'number' })
  remove(
    @Param('chatId') chatId: number,
    @Param('warningId') warningId: number,
  ) {
    return this.warningService.remove(chatId, warningId);
  }
}
