import { Test, TestingModule } from '@nestjs/testing';
import { WsAlertGateway } from './ws-alert.gateway';
import { WsAlertService } from './ws-alert.service';

describe('WsAlertGateway', () => {
  let gateway: WsAlertGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsAlertGateway, WsAlertService],
    }).compile();

    gateway = module.get<WsAlertGateway>(WsAlertGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
