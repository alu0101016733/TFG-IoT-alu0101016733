import { Test, TestingModule } from '@nestjs/testing';
import { TelegramWarningController } from './telegram-warning.controller';
import { TelegramWarningService } from './telegram-warning.service';

describe('TelegramWarningController', () => {
  let controller: TelegramWarningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramWarningController],
      providers: [TelegramWarningService],
    }).compile();

    controller = module.get<TelegramWarningController>(TelegramWarningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
