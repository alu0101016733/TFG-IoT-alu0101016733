import { ApiProperty } from '@nestjs/swagger';

export class DeviceDto {
  @ApiProperty()
  deviceEui: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  deviceTypeId: number;
}
