import { SensorHistoryType } from "../ResponseDataTypes";

export const humiditySensor: SensorHistoryType = {
  sensorInfo: {
    id: "Temperature",
  },
  departments: [{ id: 1, name: "test_dep" }],
  aulas: [
    { id: 2, idDepartment: 1, name: "test_aula_1" },
    { id: 3, idDepartment: 1, name: "test_aula_2" },
  ],
  data: [
    {
      time: 20,
      "1,2": 20.5,
      "1,3": 21.5,
    },
    {
      time: 30,
      "1,2": 21.5,
    },
    {
      time: 32,
      "1,3": 23.5,
    },
    {
      time: 40,
      "1,2": 22.5,
      "1,3": 21.5,
    },
    {
      time: 50,
      "1,2": 25.5,
      "1,3": 18.5,
    },
    {
      time: 60,
      "1,2": 28.5,
      "1,3": 19.5,
    },
  ],
};
