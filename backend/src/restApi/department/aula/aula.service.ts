import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Aula } from 'src/entity/Aula';

@Injectable()
export class AulaService extends TypeOrmCrudService<Aula> {
  constructor(@InjectRepository(Aula) repo) {
    super(repo);
  }
}
