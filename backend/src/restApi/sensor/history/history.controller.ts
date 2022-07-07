import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { History } from 'src/entity/History';
import { HistoryView } from 'src/entity/views/HistoryView';
import { HistoryService } from './history.service';

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
    deviceId: {
      field: 'deviceId',
      type: 'string',
    },
  },
})
@Controller('sensor/:sensorId/:deviceId')
export class HistoryController implements CrudController<HistoryView> {
  constructor(public service: HistoryService) {}
}
