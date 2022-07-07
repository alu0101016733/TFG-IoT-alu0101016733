import { Module } from '@nestjs/common';
import { WsAlertService } from './ws-alert.service';
import { WsAlertGateway } from './ws-alert.gateway';

@Module({
  providers: [WsAlertGateway, WsAlertService]
})
export class WsAlertModule {}
