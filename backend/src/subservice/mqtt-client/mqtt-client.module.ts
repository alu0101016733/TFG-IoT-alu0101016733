import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MqttClientService } from './mqtt-client.service';

@Module({
  imports: [HttpModule],
  providers: [MqttClientService],
})
export class MqttClientModule {
  constructor(private mqttClientService: MqttClientService) {}
}
