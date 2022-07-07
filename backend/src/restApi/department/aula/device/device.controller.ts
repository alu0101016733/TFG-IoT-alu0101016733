import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Device } from 'src/entity/Device';
import { DeviceView } from 'src/entity/views/DeviceView';
import { DeviceService } from './device.service';
import { DeviceDto } from './dto/device.dto';

@Controller('department/:departmentId/aula/:aulaId/device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiParam({ name: 'aulaId', type: 'number' })
  create(@Param('aulaId') aulaId: number, @Body() DeviceDto: DeviceDto) {
    return this.deviceService.create(aulaId, DeviceDto);
  }

  @Get()
  @ApiParam({ name: 'aulaId', type: 'number' })
  findAll(@Param('aulaId') aulaId: number) {
    return this.deviceService.findAll(aulaId);
  }

  @Patch(':deviceEui')
  @ApiParam({ name: 'aulaId', type: 'number' })
  update(
    @Param('aulaId') aulaId: number,
    @Param('deviceEui') deviceEui: string,
    @Body() DeviceDto: Pick<DeviceDto, 'description'>,
  ) {
    return this.deviceService.update(aulaId, deviceEui, DeviceDto);
  }

  @Delete(':deviceEui')
  @ApiParam({ name: 'aulaId', type: 'number' })
  remove(
    @Param('aulaId') aulaId: number,
    @Param('deviceEui') deviceEui: string,
  ) {
    return this.deviceService.remove(aulaId, deviceEui);
  }
}
