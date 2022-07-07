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
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { sensorWarningsAtom } from "../../atoms/registered-alarms-atoms";
import { useTheme } from "../ThemeProvider";

function padTo2Digits(num: number): string {
  return num.toString().padStart(2, "0");
}

export const AlarmPage = () => {
  const [alarms, setAlarms] = useRecoilState(sensorWarningsAtom);

  const removeAlert = (position: number) => {
    return () => {
      setAlarms((alarms) =>
        alarms.slice(0, position).concat(alarms.slice(position + 1))
      );
    };
  };
  // const [bids, setBids] = useState([] as string[]);

  const { theme } = useTheme();

  return (
    <>
      <h1 style={{ padding: "50px" }}>Triggered Alerts</h1>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.backgroundCard,
          color: "inherit",
          padding: "20px 50px",
          margin: "auto",
          maxWidth: "1600px",
        }}
      >
        <Table
          sx={{ minWidth: 650, color: "inherit" }}
          aria-label="simple table"
        >
          <TableHead sx={{ color: "inherit" }}>
            <TableRow sx={{ color: "inherit" }}>
              <TableCell sx={{ color: "inherit" }}>Name</TableCell>
              <TableCell sx={{ color: "inherit" }} align="right">
                Time
              </TableCell>
              <TableCell sx={{ color: "inherit" }} align="right">
                Department
              </TableCell>
              <TableCell sx={{ color: "inherit" }} align="right">
                Aula
              </TableCell>
              <TableCell sx={{ color: "inherit" }} align="right">
                Value
              </TableCell>
              <TableCell sx={{ color: "inherit" }} align="right">
                Min
              </TableCell>
              <TableCell sx={{ color: "inherit" }} align="right">
                Max
              </TableCell>
              <TableCell sx={{ color: "inherit" }} align="right">
                Message
              </TableCell>
              <TableCell sx={{ color: "inherit" }} align="right">
                Remove
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ color: "inherit" }}>
            {alarms
              .slice(0)
              .reverse()
              .map((alert, index) => {
                const time = new Date(parseInt(alert.triggeredTime));
                console.log(time.getHours());
                const timeStr: string = `${padTo2Digits(
                  time.getHours()
                )}:${padTo2Digits(time.getMinutes())}:${padTo2Digits(
                  time.getSeconds()
                )}`;

                return (
                  <TableRow
                    key={alert.name + index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{ color: "inherit" }}
                      component="th"
                      scope="row"
                    >
                      {alert.name}
                    </TableCell>
                    <TableCell sx={{ color: "inherit" }} align="right">
                      {timeStr}
                    </TableCell>
                    <TableCell sx={{ color: "inherit" }} align="right">
                      {alert.department}
                    </TableCell>
                    <TableCell sx={{ color: "inherit" }} align="right">
                      {alert.aula}
                    </TableCell>
                    <TableCell sx={{ color: "inherit" }} align="right">
                      <Chip
                        label={alert.value}
                        color="error"
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell sx={{ color: "inherit" }} align="right">
                      {alert.min}
                    </TableCell>
                    <TableCell sx={{ color: "inherit" }} align="right">
                      {alert.max}
                    </TableCell>
                    <TableCell sx={{ color: "inherit" }} align="right">
                      {alert.message}
                    </TableCell>
                    <TableCell sx={{ color: "inherit" }} align="right">
                      <Button
                        onClick={removeAlert(index)}
                        size="small"
                        variant="outlined"
                        color="warning"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AlarmPage;
