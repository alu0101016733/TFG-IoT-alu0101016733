import { Test, TestingModule } from '@nestjs/testing';
import { ConfigWarningService } from './config-warning.service';

describe('ConfigWarningService', () => {
  let service: ConfigWarningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigWarningService],
    }).compile();

    service = module.get<ConfigWarningService>(ConfigWarningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
