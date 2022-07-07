import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Sensor } from 'src/entity/Sensor';
import { SensorService } from './sensor.service';

@Crud({
  model: {
    type: Sensor,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('sensor')
export class SensorController implements CrudController<Sensor> {
  constructor(public service: SensorService) {}
}
