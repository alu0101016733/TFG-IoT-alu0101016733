import { FC, useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { SensorHistoryType } from "../../backendComunication/ResponseDataTypes";
import { useTheme } from "../../modules/ThemeProvider";
import { createColorGroups } from "../../tools/colorGroups";
import { DAY_IN_SECONDS } from "../../usefulConstants";

const getColorDepartmentGroups = (
  departmentIds: number[],
  maxNumOfMembers: number
) => {
  let result: { [key: number]: string[] } = {};
  let colorPalette = createColorGroups(departmentIds.length, maxNumOfMembers);
  for (let i = 0; i < departmentIds.length; i++) {
    result[departmentIds[i]] = colorPalette[i].map(
      (color) => `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
    );
  }
  return result;
};

export type SensorDataChartsProps = {
  sensorHistoryData: SensorHistoryType;
  numOfXAxisLabels?: number;
  width?: number;
  height?: number;
  timeScale?: { from: number; to: number }; // time in seconds interval (NOT REAL TIME BUT INVERSED SECONDS)
  label?: { [key: string]: string }; // key should have identifier as the object representing them ("departmentId,aulaId")
};

// chart sensor data:
export const SensorDataCharts: FC<SensorDataChartsProps> = ({
  sensorHistoryData,
  numOfXAxisLabels = 8,
  width = 600,
  height = 300,
  timeScale = { from: DAY_IN_SECONDS, to: 0 },
  label = {},
  ...props
}) => {
  console.log("Updating chart", height);
  console.log(sensorHistoryData);

  //const sensorHistoryData = humiditySensor;
  const lineDataKeys: string[] | undefined = sensorHistoryData.aulas.map(
    ({ id, idDepartment }) => idDepartment + "," + id
  );

  let maxAulasInDepartment = useMemo(() => {
    return Math.max(
      ...(Object.values(
        sensorHistoryData.aulas
          .map(({ idDepartment }) => idDepartment)
          .reduce(
            (acc: any, cur: number) => ((acc[cur] = (acc[cur] || 0) + 1), acc),
            {}
          )
      ) as number[])
    );
  }, [sensorHistoryData]);

  const colorPalette = useMemo(() => {
    return getColorDepartmentGroups(
      sensorHistoryData.departments.map(({ id }) => id),
      maxAulasInDepartment
    );
  }, [sensorHistoryData]);

  const colorPalletePositionControl = Object.keys(colorPalette).reduce(
    (acc: any, cur) => {
      acc[cur] = 0;
      return acc;
    },
    {}
  );

  const { theme } = useTheme();

  return (
    <LineChart width={width} height={height} data={sensorHistoryData.data}>
      <CartesianGrid stroke="#333" strokeWidth={1} strokeOpacity={0.5} />
      {lineDataKeys.map((key, index) => {
        const curDeptId: number = parseInt(key.split(",")?.[0]);
        return (
          <Line
            key={index}
            type="linear"
            connectNulls={true}
            dataKey={key}
            name={
              label[key] ||
              sensorHistoryData.departments.filter(
                (cur) => cur.id === curDeptId
              )[0].name
            }
            stroke={
              colorPalette[curDeptId]?.[
                colorPalletePositionControl[curDeptId]++
              ] || "#0f0"
            }
            strokeWidth={2}
            dot={false}
          />
        );
      })}
      <XAxis
        dataKey="time"
        type="number"
        scale="time"
        domain={["dataMin", "dataMax"]}
        ticks={[
          0,
          ...[...Array(numOfXAxisLabels)].map(
            (__, index) =>
              ((timeScale.from - timeScale.to) / numOfXAxisLabels) * (index + 1)
          ),
        ]}
        tickFormatter={(value: any, index: number) => {
          return (
            Math.floor((10 * (value - timeScale.from)) / (60 * 60)) / 10 + "h"
          );
        }}
      />
      <YAxis domain={["dataMin", "dataMax"]} />
      <Tooltip contentStyle={{ backgroundColor: theme.backgroundCard }} />
      <Legend />
    </LineChart>
  );
};

export default SensorDataCharts;
