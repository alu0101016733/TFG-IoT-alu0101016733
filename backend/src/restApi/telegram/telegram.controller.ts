import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { TelegramChats } from 'src/entity/TelegramChats';
import { TelegramService } from './telegram.service';

@Crud({
  model: {
    type: TelegramChats,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
})
@Controller('telegram')
export class TelegramController implements CrudController<TelegramChats> {
  constructor(public service: TelegramService) {}
}
