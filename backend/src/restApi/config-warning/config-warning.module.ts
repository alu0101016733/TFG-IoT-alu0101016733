import { Module } from '@nestjs/common';
import { ConfigWarningService } from './config-warning.service';
import { ConfigWarningController } from './config-warning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warning } from 'src/entity/Warning';

@Module({
  controllers: [ConfigWarningController],
  providers: [ConfigWarningService],
  imports: [TypeOrmModule.forFeature([Warning])],
})
export class ConfigWarningModule {}
