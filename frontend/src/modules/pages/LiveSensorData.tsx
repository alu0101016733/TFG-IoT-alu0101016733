import { useEffect, useMemo, useRef, useState } from "react";
import { BackendWebSocket } from "../../backendComunication/BackendWebSocket";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { fromUnixMiliseconds } from "../../tools/unixToTime";
import { defaultStyle } from "./ConfigurationPage/baseStyle";
import { cx } from "@emotion/css";
import { withPrefix } from "../../tools/cssUtils";
import { useTheme } from "../ThemeProvider";

type LiveSensorData = {
  id: number;
  currentTime: string;
  triggeredTime: string;
  value: number;
  deviceId: string;
  sensorId: string;
  aulaId: number;
  aula: string;
  departmentId: number;
  department: string;
};

export const LiveSensorData = () => {
  const [bids, setBids] = useState([] as LiveSensorData[]);

  useEffect(() => {
    console.log(
      "=======================CREATING WEBSOCKET======================="
    );
    const ws = new WebSocket("ws://localhost:3003/sensor");
    ws.onopen = (event) => {
      console.log("OPEN");
      ws.send(
        JSON.stringify({
          event: "subscribe",
          data: JSON.stringify({
            // sensor: "Temperature",
            // device: "24E124707C142727",
          }),
        })
      );
    };
    ws.onmessage = (event) => {
      console.log("received message");
      console.log(event.data);
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.event === "sensorData") {
        try {
          if (bids.length <= 50) {
            setBids((bids) => [...bids, data.data]);
          } else {
            setBids((bids) => {
              bids.shift();
              return [...bids, data.data];
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,
          event
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log("[close] Connection died", event);
      }
    };
    ws.onerror = (error) => {
      console.log(`[ERROR]`, error);
    };
    //clean up function
    return () => {
      console.log("Closing conection");
      ws.close();
    };
  }, []);

  const pfx = withPrefix("tfg");

  const { theme } = useTheme();

  return (
    <div className={cx(defaultStyle("tfg", theme), pfx("config-base-main"))}>
      <h1>SensorData</h1>
      <div className={cx(pfx("config-base-container"))}>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.backgroundCard,
            color: theme.color,
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: theme.color }}>
                  Triggered Time
                </TableCell>
                <TableCell sx={{ color: theme.color }} align="right">
                  Device
                </TableCell>
                <TableCell sx={{ color: theme.color }} align="right">
                  Sensor
                </TableCell>
                <TableCell sx={{ color: theme.color }} align="right">
                  Department
                </TableCell>
                <TableCell sx={{ color: theme.color }} align="right">
                  Aula
                </TableCell>
                <TableCell sx={{ color: theme.color }} align="right">
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bids
                .slice(0)
                .reverse()
                .map((sensorData, index) => {
                  const timeStr: string = fromUnixMiliseconds(
                    sensorData.triggeredTime
                  );

                  return (
                    <TableRow
                      key={sensorData.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={{ color: theme.color }}
                        component="th"
                        scope="row"
                      >
                        {timeStr}
                      </TableCell>
                      <TableCell sx={{ color: theme.color }} align="right">
                        {sensorData.deviceId}
                      </TableCell>
                      <TableCell sx={{ color: theme.color }} align="right">
                        {sensorData.sensorId}
                      </TableCell>
                      <TableCell sx={{ color: theme.color }} align="right">
                        {sensorData.department}
                      </TableCell>
                      <TableCell sx={{ color: theme.color }} align="right">
                        {sensorData.aula}
                      </TableCell>
                      <TableCell sx={{ color: theme.color }} align="right">
                        <Chip
                          label={sensorData.value}
                          color="error"
                          variant="filled"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LiveSensorData;
