import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { History } from 'src/entity/History';
import { HistoryView } from 'src/entity/views/HistoryView';

@Injectable()
export class HistoryAulaService extends TypeOrmCrudService<HistoryView> {
  constructor(@InjectRepository(HistoryView) repo) {
    super(repo);
  }
}
