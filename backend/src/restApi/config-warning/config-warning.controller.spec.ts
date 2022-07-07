import { Test, TestingModule } from '@nestjs/testing';
import { ConfigWarningController } from './config-warning.controller';
import { ConfigWarningService } from './config-warning.service';

describe('ConfigWarningController', () => {
  let controller: ConfigWarningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigWarningController],
      providers: [ConfigWarningService],
    }).compile();

    controller = module.get<ConfigWarningController>(ConfigWarningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
