import { ApiProperty } from '@nestjs/swagger';
import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { Aula } from '../Aula';
import { Department } from '../Department';
import { Device } from '../Device';
import { History } from '../History';
import { Sensor } from '../Sensor';
import { TriggeredWarning } from '../TriggeredWarning';
import { Warning } from '../Warning';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('warning.id', 'warningId')
      .addSelect('history.id', 'historyId')
      .addSelect('warning.name', 'name')
      .addSelect('warning.description', 'description')
      .addSelect('warning.message', 'message')
      .addSelect('warning.max', 'max')
      .addSelect('warning.min', 'min')
      .addSelect('sensor.name', 'sensor')
      .addSelect('history.value', 'value')
      .addSelect('history.triggeredTime', 'triggeredTime')
      .addSelect('device.eui', 'deviceEui')
      .addSelect('aula.name', 'aula')
      .addSelect('department.name', 'department')
      .from(Warning, 'warning')
      .innerJoin(Sensor, 'sensor', 'sensor.id = warning.sensorId')
      .innerJoin(
        TriggeredWarning,
        'triggeredWarning',
        'triggeredWarning.warningId = warning.id',
      )
      .innerJoin(History, 'history', 'triggeredWarning.historyId = history.id')
      .innerJoin(Device, 'device', 'history.deviceId = device.eui')
      .innerJoin(Aula, 'aula', 'aula.id = device.aula')
      .innerJoin(Department, 'department', 'department.id = aula.department'),
})
export class TriggeredWarningView {
  @ViewColumn()
  warningId: string;

  @ViewColumn()
  historyId: string;

  @ViewColumn()
  name: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  message: string;

  @ViewColumn()
  max: string;

  @ViewColumn()
  min: string;

  @ViewColumn()
  sensor: string;

  @ViewColumn()
  value: string;

  @ViewColumn()
  triggeredTime: string;

  @ViewColumn()
  deviceEui: string;

  @ViewColumn()
  aula: string;

  @ViewColumn()
  department: string;
}
