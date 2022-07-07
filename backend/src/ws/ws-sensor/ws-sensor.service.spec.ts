import { Test, TestingModule } from '@nestjs/testing';
import { WsSensorService } from './ws-sensor.service';

describe('WsSensorService', () => {
  let service: WsSensorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsSensorService],
    }).compile();

    service = module.get<WsSensorService>(WsSensorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
