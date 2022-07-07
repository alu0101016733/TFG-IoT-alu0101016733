import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Warning } from 'src/entity/Warning';

@Injectable()
export class ConfigWarningService extends TypeOrmCrudService<Warning> {
  constructor(@InjectRepository(Warning) repo) {
    super(repo);
  }
}
