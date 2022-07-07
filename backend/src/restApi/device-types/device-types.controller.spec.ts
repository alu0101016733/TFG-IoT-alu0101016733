import { Test, TestingModule } from '@nestjs/testing';
import { DeviceTypesController } from './device-types.controller';
import { DeviceTypesService } from './device-types.service';

describe('DeviceTypesController', () => {
  let controller: DeviceTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceTypesController],
      providers: [DeviceTypesService],
    }).compile();

    controller = module.get<DeviceTypesController>(DeviceTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
