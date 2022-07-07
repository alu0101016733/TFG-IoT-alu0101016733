import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TelegramChats } from 'src/entity/TelegramChats';

@Injectable()
export class TelegramService extends TypeOrmCrudService<TelegramChats> {
  constructor(@InjectRepository(TelegramChats) repo) {
    super(repo);
  }
}
