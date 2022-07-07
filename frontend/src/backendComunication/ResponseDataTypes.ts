export type SensorInformationType = {
  id: string;
};

export type DepartmentInformationType = {
  id: number;
  name: string;
};

export type AulaInformationType = {
  id: number;
  idDepartment: number;
  name: string;
};

export type SensorHistoryDataType = {
  // This should always come in the following logic:
  // name: contains actually the time
  // "1,2": is combination of department_id,aula_id
  [key: string]: number;
};

export type SensorHistoryType = {
  sensorInfo: SensorInformationType;
  departments: DepartmentInformationType[];
  aulas: AulaInformationType[];
  data: SensorHistoryDataType[];
};

export const isSensorHistoryType = (toCheck: any) => {
  return (
    toCheck &&
    toCheck.sensorInfo !== undefined &&
    toCheck.departments !== undefined &&
    toCheck.aulas !== undefined &&
    toCheck.data !== undefined
  );
};
