import { ApiProperty } from '@nestjs/swagger';
import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { Aula } from '../Aula';
import { Department } from '../Department';
import { Device } from '../Device';
import { History } from '../History';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('history.id', 'id')
      .addSelect('history.currentTime', 'currentTime')
      .addSelect('history.triggeredTime', 'triggeredTime')
      .addSelect('history.value', 'value')
      .addSelect('device.eui', 'deviceId')
      .addSelect('history.sensorId', 'sensorId')
      .addSelect('aula.id', 'aulaId')
      .addSelect('aula.name', 'aula')
      .addSelect('department.id', 'departmentId')
      .addSelect('department.name', 'department')
      .from(History, 'history')
      .innerJoin(Device, 'device', 'history.deviceId = device.eui')
      .innerJoin(Aula, 'aula', 'aula.id = device.aula')
      .innerJoin(Department, 'department', 'department.id = aula.department'),
})
export class HistoryView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  currentTime: number;

  @ViewColumn()
  triggeredTime: number;

  @ViewColumn()
  value: string;

  @ViewColumn()
  deviceId: string;

  @ViewColumn()
  sensorId: string;

  @ViewColumn()
  aulaId: string;

  @ViewColumn()
  aula: string;

  @ViewColumn()
  departmentId: string;

  @ViewColumn()
  department: string;
}
