import { Global, Module } from '@nestjs/common';
import { WsSensorService } from './ws-sensor.service';
import { WsSensorGateway } from './ws-sensor.gateway';

@Global()
@Module({
  providers: [WsSensorGateway, WsSensorService],
  exports: [WsSensorService],
})
export class WsSensorModule {}
