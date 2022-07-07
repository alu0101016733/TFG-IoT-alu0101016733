import { getAula } from "../../../backendComunication/config/aulas";
import { getDepartment } from "../../../backendComunication/config/departments";
import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { defaultStyle } from "./baseStyle";
import { cx } from "@emotion/css";
import { withPrefix } from "../../../tools/cssUtils";
import { useTheme } from "../../ThemeProvider";
import {
  getDevicesInAula,
  updateDevicesInAula,
} from "../../../backendComunication/config/devicesInAulas";

const MoveDevices = () => {
  console.log("Crud aulas");
  const [department, setDepartment] = useState([] as any[]);
  const [selectedDepartment, setSelectedDepartment] = useState(
    undefined as undefined | number
  );
  // To where the device will be stored
  const [selectedDepartmentTo, setSelectedDepartmentTo] = useState(
    undefined as undefined | number
  );
  const [aula, setAula] = useState([] as any[]);
  const [selectedAula, setSelectedAula] = useState(
    undefined as undefined | number
  );
  // to where the device should be moved
  const [aulaTo, setAulaTo] = useState([] as any[]);
  const [selectedAulaTo, setSelectedAulaTo] = useState(
    undefined as undefined | number
  );
  const [device, setDevice] = useState([] as any[]);
  const [selectedDevice, setSelectedDevice] = useState(
    undefined as undefined | string
  );

  const [dataUpdate, setDataUpdate] = useState([]);
  // const alarms = useSetRecoilState(configWarningsAtom);

  useEffect(() => {
    getDepartment((result: any) => {
      setDepartment(() => result);
    });
    setSelectedAula(() => undefined);
    setSelectedAulaTo(() => undefined);
    setSelectedDepartment(() => undefined);
    setSelectedDepartmentTo(() => undefined);
    setSelectedDevice(() => undefined);
  }, [dataUpdate]);

  useEffect(() => {
    if (selectedDepartment !== undefined) {
      getAula(selectedDepartment, (result: any) => {
        setAula(() => result);
      });
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedDepartment !== undefined && selectedAula !== undefined) {
      getDevicesInAula(selectedDepartment, selectedAula, (result: any) => {
        setDevice(() => result);
      });
    }
  }, [selectedAula]);

  useEffect(() => {
    if (selectedDepartmentTo !== undefined) {
      getAula(selectedDepartmentTo, (result: any) => {
        setAulaTo(() => result);
      });
    }
  }, [selectedDepartmentTo]);

  const moveToNewAula = (data: any) => {
    if (
      selectedDepartmentTo === undefined ||
      selectedAulaTo === undefined ||
      selectedDepartment === undefined ||
      selectedAula === undefined ||
      selectedDevice === undefined
    ) {
      return;
    }

    const device = JSON.parse(selectedDevice);

    updateDevicesInAula(
      selectedDepartment,
      selectedAulaTo,
      device.eui,
      (result: any) => {
        setDataUpdate(() => []);
      },
      {
        aula: selectedAulaTo,
        description: device.description,
      }
    );
    return;
  };

  const pfx = withPrefix("tfg");

  const { theme } = useTheme();

  return (
    <div className={cx(defaultStyle("tfg", theme), pfx("config-base-main"))}>
      <h1>Change Sensor Placement</h1>
      <div
        className={cx(pfx("config-base-container"))}
        style={{ padding: "50px" }}
      >
        <div className={cx(pfx("config-base-container-before-action"))}>
          <h2>From:</h2>
          {department && (
            <FormControl variant="standard" fullWidth margin="dense">
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{
                  backgroundColor: theme.backgroundCard,
                  color: theme.disabledText,
                }}
              >
                select department to get started on aulas
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
                labelId="Include-Warning"
                id="warning-select"
                label="Warning"
                onChange={(event: any) =>
                  setSelectedDepartment(() => event.target.value)
                }
                value={selectedDepartment || ""}
              >
                {department &&
                  department.map((cur) => {
                    return (
                      <MenuItem value={cur.id}>
                        {cur.id + " - " + cur.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}
          {selectedDepartment && (
            <FormControl variant="standard" fullWidth margin="dense">
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{
                  backgroundColor: theme.backgroundCard,
                  color: theme.disabledText,
                }}
              >
                select aula to get started on device
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
                labelId="Include-Warning"
                id="warning-select"
                label="Warning"
                onChange={(event: any) =>
                  setSelectedAula(() => event.target.value)
                }
              >
                {aula &&
                  aula.map((cur) => {
                    return (
                      <MenuItem value={cur.id}>
                        {cur.id + " - " + cur.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}
          {selectedAula !== undefined && (
            <h2 style={{ marginTop: "50px" }}>Device:</h2>
          )}
          {selectedAula !== undefined && (
            <FormControl variant="standard" fullWidth margin="dense">
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{
                  backgroundColor: theme.backgroundCard,
                  color: theme.disabledText,
                }}
              >
                Select device
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
                labelId="Include-Warning"
                id="warning-select"
                label="Warning"
                onChange={(event: any) =>
                  setSelectedDevice(() => event.target.value)
                }
              >
                {device &&
                  device.map((cur) => {
                    return (
                      <MenuItem value={JSON.stringify(cur)}>
                        {cur.eui + " - " + cur.description}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}
          {selectedDevice !== undefined && (
            <h2 style={{ marginTop: "50px" }}>Move to:</h2>
          )}
          {selectedDevice !== undefined && (
            <FormControl variant="standard" fullWidth margin="dense">
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{
                  backgroundColor: theme.backgroundCard,
                  color: theme.disabledText,
                }}
              >
                select department
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
                labelId="Include-Warning"
                id="warning-select"
                label="Warning"
                onChange={(event: any) =>
                  setSelectedDepartmentTo(() => event.target.value)
                }
              >
                {department &&
                  department.map((cur) => {
                    return (
                      <MenuItem value={cur.id}>
                        {cur.id + " - " + cur.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}
          {selectedDepartmentTo !== undefined && (
            <FormControl variant="standard" fullWidth margin="dense">
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{
                  backgroundColor: theme.backgroundCard,
                  color: theme.disabledText,
                }}
              >
                Select aula
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
                labelId="Include-Warning"
                id="warning-select"
                label="Warning"
                onChange={(event: any) =>
                  setSelectedAulaTo(() => event.target.value)
                }
              >
                {aulaTo &&
                  aulaTo.map((cur) => {
                    return (
                      <MenuItem value={cur.id}>
                        {cur.id + " - " + cur.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}
          {selectedDepartmentTo !== undefined &&
            selectedAulaTo !== undefined &&
            selectedDepartment !== undefined &&
            selectedAula !== undefined &&
            selectedDevice !== undefined && (
              <div className={pfx("last-button-from-sensor-placement")}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={moveToNewAula}
                >
                  Move Sensor
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MoveDevices;
