import { Controller } from '@nestjs/common';
import { DeviceTypesService } from './device-types.service';
import { DeviceType } from 'src/entity/DeviceType';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: DeviceType,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
  query: {
    join: {
      sensors: {
        eager: true,
        alias: 'sensors',
      },
    },
  },
})
@Controller('device-types')
export class DeviceTypesController implements CrudController<DeviceType> {
  constructor(public service: DeviceTypesService) {}
}
