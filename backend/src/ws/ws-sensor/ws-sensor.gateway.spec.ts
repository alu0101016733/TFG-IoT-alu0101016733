import { Test, TestingModule } from '@nestjs/testing';
import { WsSensorGateway } from './ws-sensor.gateway';
import { WsSensorService } from './ws-sensor.service';

describe('WsSensorGateway', () => {
  let gateway: WsSensorGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsSensorGateway, WsSensorService],
    }).compile();

    gateway = module.get<WsSensorGateway>(WsSensorGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
