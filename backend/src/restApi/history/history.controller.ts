import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { History } from 'src/entity/History';
import { HistoryService } from './history.service';

@Crud({
  model: {
    type: History,
  },
  routes: {
    exclude: ['replaceOneBase'],
  },
})
@Controller('history')
export class HistoryController implements CrudController<History> {
  constructor(public service: HistoryService) {}
}
