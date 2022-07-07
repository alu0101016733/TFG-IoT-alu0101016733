import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { History } from 'src/entity/History';

@Injectable()
export class HistoryService extends TypeOrmCrudService<History> {
  constructor(@InjectRepository(History) repo) {
    super(repo);
  }
}
