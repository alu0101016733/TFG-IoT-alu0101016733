/*Sensor inserts*/
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('Temperature', 'Temperature', 'Basic temperature sensor in C', 'C', '-100');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('BatteryVoltage', 'Battery voltage', 'Battery voltage', 'V', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('BatteryStatus', 'Battery status', 'Battery status', '', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('DedicatedTemperature', 'Outside Temperature', 'Dedicated temperature sensor in C', 'C', '-100');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('Humidity', 'Humidity', 'Humidity', '%', '-1');
/*Sensor milesight*/
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('BatteryPercentage', 'Battery percentage', 'Battery percentage', '%', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('CO2', 'CO2', 'CO2', 'ppm', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('LightLevel', 'Light Level', 'Light Level', 'Lumen', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('PIR', 'PIR', 'Movement sensor, 1 for movement detected, 0 for none', '', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('Pressure', 'Pressure', 'Pressure', '', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('TVOC', 'TVOC', 'TVOC', '', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('HCHO', 'HCHO', 'HCHO', '', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('PM2.5', 'PM2.5', 'PM2.5', '', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('PM10', 'PM10', 'PM10', '', '-1');
INSERT INTO `sensor` (`id`, `name`, `description`, `symbol`, `base`) VALUES ('O3', 'O3', 'O3', '', '-1');

/*Device types insert*/
INSERT INTO `device_type` (`id`, `model`, `name`, `description`, `brand`) VALUES ('1', 'lht65', '', NULL, 'dragino');
INSERT INTO `device_type` (`id`, `model`, `name`, `description`, `brand`) VALUES ('2', 'AM307', 'Air quality sensor', NULL, 'milesight');

/*what sensor are inside of device type*/
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('1', 'Temperature');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('1', 'BatteryVoltage');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('1', 'BatteryStatus');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('1', 'DedicatedTemperature');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('1', 'Humidity');
/**/
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'BatteryPercentage');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'CO2');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'Humidity');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'LightLevel');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'PIR');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'Pressure');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'TVOC');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'HCHO');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'PM2.5');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'PM10');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'O3');
INSERT INTO `device_type_sensors_sensor` (`deviceType`, `sensor`) VALUES ('2', 'Temperature');

/*Department*/
INSERT INTO `department` (`id`, `name`, `description`) VALUES ('1', 'storage', 'Just for storing data and new sensors');
INSERT INTO `aula` (`id`, `name`, `description`, `departmentId`) VALUES ('1', 'storage', 'Just for storing data', '1');

/*Test sensors*/
INSERT INTO `device` (`eui`, `description`, `type`, `aula`) VALUES ('A84041A8318279BB', 'dragino in storage', '1', '1');
INSERT INTO `device` (`eui`, `description`, `type`, `aula`) VALUES ('24E124707C142727', 'milesight in storage', '2', '1');

/*Base warnings*/
INSERT INTO `warning` (`id`, `name`, `description`, `message`, `max`, `min`, `sensorId`) VALUES(3, 'CO2 levels', 'If co2 levels exceeds', 'CO2 Leves are dangerously high', 500, -1, 'CO2');