import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { MQTT_CLIENT_DATA } from 'conectionVariables';
import { connect } from 'mqtt';
import { PORT } from 'src/main';

const OPTIONS = MQTT_CLIENT_DATA;

@Injectable()
export class MqttClientService {
  private mqttClient = null;
  private API_LINK = `http://localhost:${PORT}/history/bulk`;
  private logger: Logger = new Logger('MqttClientService');

  constructor(private httpService: HttpService) {
    this.mqttClient = connect(OPTIONS);
    this.mqttClient.on('connect', this.handleConection.bind(this));
    this.mqttClient.on('message', this.handleMessage.bind(this));
    this.mqttClient.on('error', this.handleError.bind(this));
  }

  handleConection() {
    this.logger.log('Conecting to TTN');
    this.mqttClient.subscribe(
      'v3/+/devices/+/up',
      this.handleSubscriptionError.bind(this),
    );
  }

  handleSubscriptionError(err: any) {
    if (err) {
      this.logger.error(`Subscription Error: ${err}`);
    }
  }

  handleError(err) {
    this.logger.error(err);
  }

  handleMessage(topic, message) {
    this.logger.log('reiceived message from mqtt');
    try {
      const jsonMessage = JSON.parse(message.toString());
      if (
        jsonMessage.uplink_message &&
        jsonMessage.uplink_message.decoded_payload
      ) {
        this.insertIntoApi(jsonMessage);
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }

  async insertIntoApi(data) {
    try {
      await this.httpService.axiosRef({
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8', // Indicates the content
        },
        url: this.API_LINK,
        data: JSON.stringify({
          bulk: Object.keys(data.uplink_message.decoded_payload).map(
            (sensor) => ({
              currentTime: Date.now(),
              triggeredTime: Math.floor(new Date(data.received_at).getTime()),
              value: data.uplink_message.decoded_payload[sensor],
              deviceId: data.end_device_ids.dev_eui,
              sensorId: sensor,
            }),
          ),
        }),
      });
    } catch (error) {
      this.logger.warn('Error in posting new data');
    }
  }
}
