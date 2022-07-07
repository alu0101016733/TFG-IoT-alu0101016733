import { Test, TestingModule } from '@nestjs/testing';
import { TelegramWarningService } from './telegram-warning.service';

describe('TelegramWarningService', () => {
  let service: TelegramWarningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramWarningService],
    }).compile();

    service = module.get<TelegramWarningService>(TelegramWarningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
