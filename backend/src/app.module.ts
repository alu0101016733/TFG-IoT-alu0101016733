import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Aula } from './entity/Aula';
import { Department } from './entity/Department';
import { Device } from './entity/Device';
import { DeviceType } from './entity/DeviceType';
import { History } from './entity/History';
import { Sensor } from './entity/Sensor';
import { TriggeredWarning } from './entity/TriggeredWarning';
import { Warning } from './entity/Warning';
import { DepartmentModule } from './restApi/department/department.module';
import { DeviceView } from './entity/views/DeviceView';
import { SensorModule } from './restApi/sensor/sensor.module';
import { HistoryModule } from './restApi/history/history.module';
import { DeviceTypesModule } from './restApi/device-types/device-types.module';
import { PostHistorySubscriber } from './entity/subscribers/PostHistorySubscriber';
import { DeviceTypeSensorsSensor } from './entity/DeviceTypeSensorsSensor';
import { DepartmentWarningsWarning } from './entity/DepartmentWarningsWarning';
import { AulaWarningsWarning } from './entity/AulaWarningsWarning';
import { ConfigWarningModule } from './restApi/config-warning/config-warning.module';
import { WsSensorModule } from './ws/ws-sensor/ws-sensor.module';
import { WsAlertModule } from './ws/ws-alert/ws-alert.module';
import { PostTriggeredWarningSubscriber } from './entity/subscribers/PostTriggeredWarningSubscriber';
import { TriggeredWarningView } from './entity/views/TriggeredWarningView';
import { MqttClientModule } from './subservice/mqtt-client/mqtt-client.module';
import { TelegramBotModule } from './subservice/telegram-bot/telegram-bot.module';
import { HistoryView } from './entity/views/HistoryView';
import { TelegramChats } from './entity/TelegramChats';
import { WarningTelegramChats } from './entity/WarningTelegramChats';
import { TelegramModule } from './restApi/telegram/telegram.module';
import { TelegramWarningSubscriptionView } from './entity/views/TelegramWarningSubscriptionView';
import { TelegramWarningModule } from './restApi/telegram-warning/telegram-warning.module';
import { SensorInAulaView } from './entity/views/SensorInAulaView';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tnnadmin',
      password: 'tnnadmin',
      database: 'tnn',
      // logging: true,
      entities: [
        Department,
        Aula,
        Sensor,
        Device,
        DeviceType,
        DeviceView,
        Warning,
        WarningTelegramChats,
        History,
        HistoryView,
        SensorInAulaView,
        TelegramWarningSubscriptionView,
        TelegramChats,
        TriggeredWarning,
        TriggeredWarningView,
        DeviceTypeSensorsSensor,
        DepartmentWarningsWarning,
        AulaWarningsWarning,
      ],
      subscribers: [PostHistorySubscriber, PostTriggeredWarningSubscriber],
      synchronize: true, // should not be used in production
    }),
    DepartmentModule,
    SensorModule,
    HistoryModule,
    DeviceTypesModule,
    ConfigWarningModule,
    WsSensorModule,
    WsAlertModule,
    MqttClientModule,
    TelegramBotModule,
    TelegramModule,
    TelegramWarningModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
