/**
 * Payload Decoder for The Things Network
 *
 * https://resource.milesight-iot.com/milesight/document/am300-series-user-guide-en.pdf
 *
 * Copyright 2021 Milesight IoT
 *
 * @product AM307 / AM319
 */
function Decoder(bytes, port) {
  var decoded = {};

  for (var i = 0; i < bytes.length; ) {
    var channel_id = bytes[i++];
    var channel_type = bytes[i++];
    // BATTERY PERCENTAGE
    if (channel_id === 0x01 && channel_type === 0x75) {
      decoded.BatteryPercentage = bytes[i];
      i += 1;
    }
    // TEMPERATURE
    else if (channel_id === 0x03 && channel_type === 0x67) {
      // ℃
      decoded.Temperature = readInt16LE(bytes.slice(i, i + 2)) / 10;
      i += 2;
    }
    // HUMIDITY
    else if (channel_id === 0x04 && channel_type === 0x68) {
      decoded.Humidity = bytes[i] / 2;
      i += 1;
    }
    // PIR
    else if (channel_id === 0x05 && channel_type === 0x00) {
      decoded["PIR"] = bytes[i]; //===1 ? "trigger" : "idle";
      i += 1;
    }
    // LIGHT
    else if (channel_id === 0x06 && channel_type === 0xcb) {
      decoded.LightLevel = bytes[i];
      i += 1;
    }
    // CO2
    else if (channel_id === 0x07 && channel_type === 0x7d) {
      decoded["CO2"] = readUInt16LE(bytes.slice(i, i + 2));
      i += 2;
    }
    // TVOC
    else if (channel_id === 0x08 && channel_type === 0x7d) {
      decoded["TVOC"] = readUInt16LE(bytes.slice(i, i + 2));
      i += 2;
    }
    // PRESSURE
    else if (channel_id === 0x09 && channel_type === 0x73) {
      decoded.Pressure = readUInt16LE(bytes.slice(i, i + 2)) / 10;
      i += 2;
    }
    // HCHO
    else if (channel_id === 0x0a && channel_type === 0x7d) {
      decoded["HCHO"] = readUInt16LE(bytes.slice(i, i + 2)) / 100;
      i += 2;
    }
    // PM2.5
    else if (channel_id === 0x0b && channel_type === 0x7d) {
      decoded["PM2.5"] = readUInt16LE(bytes.slice(i, i + 2));
      i += 2;
    }
    // PM10
    else if (channel_id === 0x0c && channel_type === 0x7d) {
      decoded["PM10"] = readUInt16LE(bytes.slice(i, i + 2));
      i += 2;
    }
    // O3
    else if (channel_id === 0x0d && channel_type === 0x7d) {
      decoded["O3"] = readUInt16LE(bytes.slice(i, i + 2)) / 100;
      i += 2;
    }
    // BEEP
    else if (channel_id === 0x0e && channel_type === 0x01) {
      // decoded.beep = bytes[i]===1 ? "yes" : "no";
      i += 1;
    } else {
      break;
    }
  }

  return decoded;
}

/* ******************************************
 * bytes to number
 ********************************************/
function readUInt16LE(bytes) {
  var value = (bytes[1] << 8) + bytes[0];
  return value & 0xffff;
}

function readInt16LE(bytes) {
  var ref = readUInt16LE(bytes);
  return ref > 0x7fff ? ref - 0x10000 : ref;
}

function decodeUplink(input) {
  return {
    data: Decoder(input.bytes, input.fport),
    warnings: [],
    errors: [],
  };
}
