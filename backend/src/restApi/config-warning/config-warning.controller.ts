import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Warning } from 'src/entity/Warning';
import { ConfigWarningService } from './config-warning.service';

@Crud({
  model: {
    type: Warning,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('config-warning')
export class ConfigWarningController implements CrudController<Warning> {
  constructor(public service: ConfigWarningService) {}
}
