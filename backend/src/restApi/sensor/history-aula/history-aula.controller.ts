import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { History } from 'src/entity/History';
import { HistoryView } from 'src/entity/views/HistoryView';
import { HistoryAulaService } from './history-aula.service';

@Crud({
  model: {
    type: HistoryView,
  },
  routes: {
    only: ['getManyBase'],
    //exclude: ['createManyBase', 'replaceOneBase'],
  },
  params: {
    sensorId: {
      field: 'sensorId',
      type: 'string',
    },
    aulaId: {
      field: 'aulaId',
      type: 'string',
    },
  },
})
@Controller('sensor/:sensorId/aula/:aulaId')
export class HistoryAulaController implements CrudController<HistoryView> {
  constructor(public service: HistoryAulaService) {}
}
