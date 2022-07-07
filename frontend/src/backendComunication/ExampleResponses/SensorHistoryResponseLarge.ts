import { SensorHistoryType } from "../ResponseDataTypes";

export const humiditySensor: SensorHistoryType = {
  sensorInfo: {
    id: "Temperature",
  },
  departments: [
    { id: 1, name: "test_dep_1" },
    { id: 5, name: "test_dep_2" },
  ],
  aulas: [
    { id: 2, idDepartment: 1, name: "test_aula_1" },
    { id: 3, idDepartment: 1, name: "test_aula_2" },
    { id: 6, idDepartment: 5, name: "test_aula_3" },
  ],
  data: [
    {
      time: 20,
      "1,2": 20.5,
      "1,3": 21.5,
      "5,6": 22.5,
    },
    {
      time: 30,
      "1,2": 21.5,
      "5,6": 21.5,
    },
    {
      time: 32,
      "1,3": 23.5,
    },
    {
      time: 40,
      "1,2": 22.5,
      "1,3": 21.5,
      "5,6": 22.5,
    },
    {
      time: 50,
      "1,2": 25.5,
      "1,3": 18.5,
      "5,6": 21.5,
    },
    {
      time: 60,
      "1,2": 28.5,
      "1,3": 19.5,
      "5,6": 21.5,
    },
  ],
};
