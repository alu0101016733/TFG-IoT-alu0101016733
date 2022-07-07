import { Test, TestingModule } from '@nestjs/testing';
import { WsAlertService } from './ws-alert.service';

describe('WsAlertService', () => {
  let service: WsAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsAlertService],
    }).compile();

    service = module.get<WsAlertService>(WsAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
