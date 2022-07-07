import { Test, TestingModule } from '@nestjs/testing';
import { WarningService } from './warning.service';

describe('WarningService', () => {
  let service: WarningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarningService],
    }).compile();

    service = module.get<WarningService>(WarningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
