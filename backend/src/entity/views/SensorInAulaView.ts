import { ApiProperty } from '@nestjs/swagger';
import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { Aula } from '../Aula';
import { Department } from '../Department';
import { Device } from '../Device';
import { DeviceType } from '../DeviceType';
import { DeviceTypeSensorsSensor } from '../DeviceTypeSensorsSensor';
import { History } from '../History';
import { Sensor } from '../Sensor';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('sensor.id', 'id')
      .addSelect('sensor.name', 'name')
      .addSelect('sensor.description', 'description')
      .addSelect('sensor.symbol', 'symbol')
      .addSelect('device.eui', 'eui')
      .addSelect('aula.id', 'aulaId')
      .addSelect('department.id', 'departmentId')
      .from(Sensor, 'sensor')
      .innerJoin(
        DeviceTypeSensorsSensor,
        'deviceTypeSensor',
        'deviceTypeSensor.sensor = sensor.id',
      )
      .innerJoin(
        DeviceType,
        'deviceType',
        'deviceType.id = deviceTypeSensor.deviceType',
      )
      .innerJoin(Device, 'device', 'device.type = deviceType.id')
      .innerJoin(Aula, 'aula', 'aula.id = device.aula')
      .innerJoin(Department, 'department', 'department.id = aula.department')
      .innerJoin(History, 'history', 'history.sensorId = sensor.id'),
})
export class SensorInAulaView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  symbol: string;

  @ViewColumn()
  eui: string;

  @ViewColumn()
  aulaId: number;

  @ViewColumn()
  departmentId: number;
}
