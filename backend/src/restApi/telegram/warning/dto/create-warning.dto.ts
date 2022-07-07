import { ApiProperty } from '@nestjs/swagger';

export class CreateWarningDto {
  @ApiProperty()
  warningId: number;
}
