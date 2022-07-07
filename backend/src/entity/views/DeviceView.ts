import { ApiProperty } from '@nestjs/swagger';
import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { Aula } from '../Aula';
import { Department } from '../Department';
import { Device } from '../Device';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('device.eui', 'id')
      .addSelect('device.description', 'description')
      .addSelect('device.type', 'deviceType')
      .addSelect('aula.id', 'aulaId')
      .addSelect('department.id', 'departmentId')
      .from(Device, 'device')
      .leftJoin(Aula, 'aula', 'aula.id = device.aula')
      .leftJoin(Department, 'department', 'department.id = aula.department'),
})
export class DeviceView {
  @ApiProperty()
  @ViewColumn()
  id: string;

  @ApiProperty()
  @ViewColumn()
  description: string;

  @ApiProperty()
  @ViewColumn()
  deviceType: string;

  @ViewColumn()
  aulaId: string;

  @ViewColumn()
  departmentId: string;
}
