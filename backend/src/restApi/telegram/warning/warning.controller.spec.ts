import { Test, TestingModule } from '@nestjs/testing';
import { WarningController } from './warning.controller';
import { WarningService } from './warning.service';

describe('WarningController', () => {
  let controller: WarningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarningController],
      providers: [WarningService],
    }).compile();

    controller = module.get<WarningController>(WarningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
