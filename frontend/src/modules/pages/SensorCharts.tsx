import { FC, useEffect, useMemo, useRef, useState } from "react";
import { getAula } from "../../backendComunication/config/aulas";
import { getDepartment } from "../../backendComunication/config/departments";
import { SensorDataCharts } from "../../components/charts/SensorDataCharts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getSensorsInAula } from "../../backendComunication/config/sensorInAulas";
import { getSensorsHistory } from "../../backendComunication/config/sensorHistory";
import { DAY_IN_MILISECONDS } from "../../usefulConstants";
import {
  isSensorHistoryType,
  SensorHistoryType,
} from "../../backendComunication/ResponseDataTypes";
import { withPrefix } from "../../tools/cssUtils";
import { cx } from "@emotion/css";
import { defaultStyle } from "./SensorCharts.style";
import { useRecoilValue } from "recoil";
import { rightSidebarAtom } from "../../atoms/base-layout-atoms";
import { useTheme } from "../ThemeProvider";
import { hoursToMiliseconds } from "../../tools/timeConverter";
import SensorChartsTimeSelect from "./SensorChartsTimeSelect";

type sensorHistoryWithLabel = {
  formattedData: SensorHistoryType;
  labels?: { [key: string]: string };
};

// group colors by department to get bettwe diferences
const departmentConvertHistoryViewToChartFormat = (
  data: any,
  TimeInMs: number = DAY_IN_MILISECONDS
): sensorHistoryWithLabel => {
  const timeToRemove = new Date().getTime() - TimeInMs;
  const toRemove = [];
  // each eui will be converted into number, to make chart thinking that it works with aula
  const numberToEui = {} as any;
  numberToEui[data[0].deviceId] = 0;
  const formattedData: SensorHistoryType = {
    sensorInfo: {
      id: data[0]?.sensorId,
    },
    departments: [
      { id: numberToEui[data[0].deviceId], name: data[0]?.deviceId },
    ],
    aulas: [
      {
        id: numberToEui[data[0].deviceId],
        idDepartment: numberToEui[data[0].deviceId],
        name: data[0]?.eui,
      },
    ],
    data: [],
  };
  formattedData.data = data.map((cur: any, index: number) => {
    const entry: any = {
      time: Math.floor((cur.triggeredTime - timeToRemove) / 1000),
    };
    if (numberToEui[cur.deviceId] === undefined) {
      numberToEui[cur.deviceId] = index;
      formattedData.departments.push({
        id: numberToEui[cur.deviceId],
        name: cur.deviceId,
      });
      formattedData.aulas.push({
        id: numberToEui[cur.deviceId],
        idDepartment: numberToEui[cur.deviceId],
        name: cur.deviceId,
      });
    }
    entry[`${numberToEui[cur.deviceId]},${numberToEui[cur.deviceId]}`] =
      cur.value;
    if (entry.time >= 0) {
      return entry;
    } else {
      toRemove.push(index);
    }
  });
  return { formattedData };
};

// group them by aula, colors will be quite similar
const convertHistoryViewToChartFormat = (
  data: any,
  TimeInMs: number = DAY_IN_MILISECONDS
): sensorHistoryWithLabel => {
  const timeToRemove = new Date().getTime() - TimeInMs;
  const toRemove = [];
  // each eui will be converted into number, to make chart thinking that it works with aula
  const numberToEui = {} as any;
  const labels = {} as any;
  numberToEui[data[0].deviceId] = 0;
  const formattedData: SensorHistoryType = {
    sensorInfo: {
      id: data[0]?.sensorId,
    },
    departments: [{ id: data[0]?.departmentId, name: data[0]?.department }],
    aulas: [
      {
        id: numberToEui[data[0].deviceId],
        idDepartment: data[0]?.departmentId,
        name: data[0]?.deviceId,
      },
    ],
    data: [],
  };
  formattedData.data = data.map((cur: any, index: number) => {
    const entry: any = {
      time: Math.floor((cur.triggeredTime - timeToRemove) / 1000),
    };
    const entryId: string = `${cur.departmentId},${numberToEui[cur.deviceId]}`;
    if (labels[entryId] === undefined) {
      labels[entryId] = cur.deviceId;
    }
    if (numberToEui[cur.deviceId] === undefined) {
      numberToEui[cur.deviceId] = index;
      formattedData.aulas.push({
        id: numberToEui[cur.deviceId],
        idDepartment: data[0]?.departmentId,
        name: cur.deviceId,
      });
    }
    entry[entryId] = cur.value;
    if (entry.time >= 0) {
      return entry;
    } else {
      toRemove.push(index);
    }
  });
  return { formattedData, labels };
};

export type SensorChartsProps = {
  id?: string; // storage id
  departmentId?: number;
  aulaId?: number;
  sensorAndEui?: string; // must be: "sensorId|eui"
  storeLocally?: boolean;
  prefix?: string;
};

export const SensorCharts: FC<SensorChartsProps> = ({
  id = "Main",
  departmentId = 0,
  aulaId = 0,
  sensorAndEui = "",
  storeLocally = true,
  prefix = "tfg-sensor",
  ...props
}) => {
  console.log("BASE PAGE");
  const INSIDE_ID = "bPc" + id;
  const pfx = withPrefix(prefix);

  const rawChartData = useRef([] as any[]);
  const [chartData, setChartData] = useState({} as sensorHistoryWithLabel);
  const [departments, setDepartments] = useState([] as any[]);
  const [aulas, setAulas] = useState([] as any[]);
  const [sensors, setSensors] = useState([] as any[]);

  // rerender to update chart size when right sidebar changes
  const sidebarState = useRecoilValue(rightSidebarAtom);

  // selected states
  const [department, setDepartment] = useState(departmentId);
  const [aula, setAula] = useState(aulaId);
  const [activeSensor, setActiveSensor] = useState(sensorAndEui);
  const [activeSensorDescription, setActiveSensorDescription] = useState(
    {} as any
  );
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [timeRange, setTimeRange] = useState({
    to: undefined,
    lastHours: hoursToMiliseconds(24),
  } as { to: undefined | number; lastHours: number });

  // update timerange
  const setTimeRangeCB = (from: number, to: number | undefined = undefined) => {
    setTimeRange(() => ({ to: to, lastHours: from }));
    console.log("UPDATING TIME RANGE", from, to);
  };

  //chart ref
  const chartDivRef = useRef({} as HTMLDivElement);
  const { theme } = useTheme();

  // get from storage
  useEffect(() => {
    if (
      storeLocally &&
      (departmentId === 0 || aulaId === 0 || sensorAndEui === "")
    ) {
      const fromStorage = localStorage.getItem(INSIDE_ID);
      if (fromStorage) {
        const parsed = JSON.parse(fromStorage);
        setDepartment(() =>
          departmentId === 0
            ? parsed.departmentId || departmentId
            : departmentId
        );
        setAula(() => (aulaId === 0 ? parsed.aulaId || aulaId : aulaId));
        setActiveSensor(() =>
          sensorAndEui === ""
            ? parsed.sensorAndEui || sensorAndEui
            : sensorAndEui
        );
        setActiveSensorDescription(() => {
          const [id, eui] = activeSensor.split("|");
          return sensors[
            sensors.findIndex((cur) => cur.id === id && cur.eui === eui)
          ];
        });
      }
    }
  }, []);

  // store variables to local storage
  useEffect(() => {
    if (storeLocally && loadingComplete) {
      localStorage.setItem(
        INSIDE_ID,
        JSON.stringify({
          departmentId: department,
          aulaId: aula,
          sensorAndEui: activeSensor,
        })
      );
    }
  }, [department, aula, activeSensor]);

  // get departments
  useEffect(() => {
    getDepartment((result: any) => {
      setDepartments(result);
    });
  }, []);

  // get aulas
  useEffect(() => {
    if (department !== 0) {
      getAula(department, (result: any) => {
        setAulas(() => result);
      });
    }
  }, [department]);

  // get sensors in aula
  useEffect(() => {
    if (aula !== 0) {
      getSensorsInAula(department, aula, (result: any) => {
        const alreadySeen = [] as string[];
        const setSensor = [] as any;
        result.map((cur: any) => {
          if (!alreadySeen.includes(cur.id)) {
            alreadySeen.push(cur.id);
            setSensor.push(cur);
          }
        });
        setSensors(() => setSensor);
      });
    }
  }, [aula]);

  // get history from sensor
  useEffect(() => {
    if (activeSensor !== "") {
      const [id, eui] = activeSensor.split("|");
      // second field is eui, but when passing aulaId, eui is ignored
      getSensorsHistory(
        id,
        eui,
        (result: any) => {
          // console.log(result);
          if (result && result.length === 0) {
            return;
          }
          rawChartData.current = result;
          setChartData(() =>
            theme.chart.colorRange === "group"
              ? convertHistoryViewToChartFormat(
                  rawChartData.current,
                  timeRange.lastHours
                )
              : departmentConvertHistoryViewToChartFormat(
                  rawChartData.current,
                  timeRange.lastHours
                )
          );
          setLoadingComplete(() => true);
        },
        aula,
        timeRange.lastHours,
        timeRange.to
      );
      setActiveSensorDescription(() => {
        const [id, eui] = activeSensor.split("|");
        return sensors[
          sensors.findIndex((cur) => cur.id === id && cur.eui === eui)
        ];
      });
    }
  }, [activeSensor, theme, timeRange]);

  useEffect(() => {
    setActiveSensorDescription(() => {
      const [id, eui] = activeSensor.split("|");
      return sensors[
        sensors.findIndex((cur) => cur.id === id && cur.eui === eui)
      ];
    });
  }, [sensors]);

  // subscribe to sensor to show data in real time
  useEffect(() => {
    if (activeSensor === "" || timeRange.to) {
      return;
    }
    const ws = new WebSocket("ws://localhost:3003/sensor");
    ws.onopen = (event) => {
      console.log("Subscribed to: ", activeSensor);
      const [id, eui] = activeSensor.split("|");
      ws.send(
        JSON.stringify({
          event: "subscribe",
          data: JSON.stringify({
            sensor: id,
            // device: eui, could be active when limiting to single sensor
            aula: aula,
          }),
        })
      );
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log(data);
      if (data.event === "sensorData") {
        rawChartData.current.push(data.data);
        setChartData(() =>
          theme.chart.colorRange === "group"
            ? convertHistoryViewToChartFormat(
                rawChartData.current,
                timeRange.lastHours
              )
            : departmentConvertHistoryViewToChartFormat(
                rawChartData.current,
                timeRange.lastHours
              )
        );
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
  }, [activeSensor, timeRange, aula, theme]);

  const [stillChanging, setStillChanging] = useState({
    width: 100,
    height: 100,
  });

  const checkChanges = () => {
    console.log("Still updating");
    if (
      chartDivRef.current?.clientWidth !== stillChanging.width ||
      chartDivRef.current?.clientHeight !== stillChanging.height
    ) {
      setStillChanging(() => ({
        width: chartDivRef.current?.clientWidth || 100,
        height: chartDivRef.current?.clientHeight || 100,
      }));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(checkChanges, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [
    stillChanging,
    chartDivRef.current.clientHeight,
    chartDivRef.current.clientWidth,
    sidebarState,
  ]);

  // useEffect(() => {
  //   const interval = setInterval(checkChanges, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className={cx(defaultStyle(prefix, theme), pfx("sensor-charts"))}>
      <div className={pfx("select-div")}>
        <FormControl
          variant="standard"
          margin="dense"
          className={pfx("select")}
        >
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ color: "inherit" }}
          >
            Department
          </InputLabel>
          <Select
            MenuProps={{
              MenuListProps: {
                style: {
                  backgroundColor: theme.backgroundCard,
                  color: theme.color,
                },
              },
            }}
            sx={{ backgroundColor: "inherit", color: "inherit" }}
            labelId="department-selection"
            id="department-select"
            value={
              department !== 0 &&
              departments
                .map((department) => department.id)
                .includes(department)
                ? department
                : (departments[0]?.id &&
                    setDepartment(() => departments[0]?.id)) ||
                  ""
            }
            label="Department"
            onChange={(event: any) => {
              setDepartment(() => event.target.value);
            }}
          >
            {departments.map((department) => (
              <MenuItem
                sx={{ backgroundColor: "inherit", color: "inherit" }}
                key={department.id}
                value={department.id}
              >
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {department !== 0 && (
          <FormControl
            variant="standard"
            margin="dense"
            className={pfx("select")}
          >
            <InputLabel
              sx={{ backgroundColor: "inherit", color: "inherit" }}
              id="demo-simple-select-standard-label"
            >
              Aula
            </InputLabel>
            <Select
              MenuProps={{
                MenuListProps: {
                  style: {
                    backgroundColor: theme.backgroundCard,
                    color: theme.color,
                  },
                },
              }}
              sx={{ backgroundColor: "inherit", color: "inherit" }}
              labelId="aula-selection"
              id="aula-select"
              value={
                aula !== 0 && aulas.map((aula) => aula.id).includes(aula)
                  ? aula
                  : (aulas[0]?.id && setAula(() => aulas[0]?.id)) || ""
              }
              label="Aula"
              onChange={(event: any) => {
                setAula(() => event.target.value);
              }}
            >
              {aulas.map((aula) => (
                <MenuItem key={aula.id} value={aula.id}>
                  {aula.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {aula !== 0 && (
          <FormControl
            variant="standard"
            margin="dense"
            className={pfx("select")}
          >
            <InputLabel
              sx={{ backgroundColor: "inherit", color: "inherit" }}
              id="demo-simple-select-standard-label"
            >
              Aula
            </InputLabel>
            <Select
              MenuProps={{
                MenuListProps: {
                  style: {
                    backgroundColor: theme.backgroundCard,
                    color: theme.color,
                  },
                },
              }}
              sx={{ backgroundColor: "inherit", color: "inherit" }}
              labelId="sensor-selection"
              id="sensor-select"
              value={
                activeSensor !== "" &&
                sensors
                  .map((sensor) => sensor.id + "|" + sensor.eui)
                  .includes(activeSensor)
                  ? activeSensor
                  : sensors[0]?.id
                  ? sensors[0]?.id + "|" + sensors[0]?.eui &&
                    (() => {
                      setActiveSensor(
                        () => sensors[0]?.id + "|" + sensors[0]?.eui
                      );
                      return true;
                    })() &&
                    setActiveSensorDescription(() => sensors[0])
                  : ""
              }
              label="Sensor"
              onChange={(event: any) => {
                setActiveSensor(() => event.target.value);
                setActiveSensorDescription(() => {
                  const [id, eui] = activeSensor.split("|");
                  return sensors[
                    sensors.findIndex((cur) => cur.id === id && cur.eui === eui)
                  ];
                });
              }}
            >
              {sensors.map((sensor) => (
                <MenuItem
                  key={sensor.id + "-" + sensor.eui}
                  value={sensor.id + "|" + sensor.eui}
                >
                  {sensor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {aula !== 0 && (
          <FormControl
            variant="standard"
            margin="dense"
            className={pfx("select")}
          >
            <SensorChartsTimeSelect
              from={timeRange.lastHours}
              to={timeRange.to}
              callback={setTimeRangeCB}
            />
          </FormControl>
        )}
      </div>

      <div>{activeSensorDescription?.description}</div>

      <div className={pfx("chart-div")} ref={chartDivRef}>
        {(isSensorHistoryType(chartData.formattedData) && (
          <SensorDataCharts
            sensorHistoryData={chartData.formattedData}
            width={chartDivRef.current.clientWidth - 24}
            height={chartDivRef.current.clientHeight - 24}
            label={chartData.labels}
            timeScale={{
              from: Math.round(timeRange.lastHours / 1000),
              to:
                timeRange.to === undefined
                  ? 0
                  : Math.round(timeRange.to / 1000),
            }}
          />
        )) ?? <div>NO DATA</div>}
      </div>
    </div>
  );
};

export default SensorCharts;
