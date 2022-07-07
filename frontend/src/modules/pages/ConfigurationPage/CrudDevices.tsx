import { CrudComponents } from "./CrudComponents";
import { getAula } from "../../../backendComunication/config/aulas";
import { getDepartment } from "../../../backendComunication/config/departments";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { configWarningsAtom } from "../../../atoms/registered-alarms-atoms";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { defaultStyle } from "./baseStyle";
import { cx } from "@emotion/css";
import { withPrefix } from "../../../tools/cssUtils";
import { useTheme } from "../../ThemeProvider";
import {
  createDevicesInAula,
  deleteDevicesInAula,
  getDevicesInAula,
  updateDevicesInAula,
} from "../../../backendComunication/config/devicesInAulas";
import { getDeviceTypes } from "../../../backendComunication/config/deviceTypes";

const CrudDevices = () => {
  console.log("Crud aulas");
  const [department, setDepartment] = useState([] as any[]);
  const [selectedDepartment, setSelectedDepartment] = useState(
    undefined as undefined | number
  );
  const [aula, setAula] = useState([] as any[]);
  const [selectedAula, setSelectedAula] = useState(
    undefined as undefined | number
  );
  const [deviceTypes, setDeviceTypes] = useState([] as any[]);
  const [selectedDeviceTypes, setSelectedDeviceTypes] = useState(
    undefined as undefined | number
  );
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const alarms = useSetRecoilState(configWarningsAtom);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRefName = useRef<any>();
  const dialogRefDescription = useRef<any>();

  useEffect(() => {
    getDepartment((result: any) => {
      setDepartment(() => result);
    });
    getDeviceTypes((result: any) => {
      setDeviceTypes(() => result);
    });
  }, [dataUpdate]);

  useEffect(() => {
    if (selectedDepartment !== undefined) {
      getAula(selectedDepartment, (result: any) => {
        setAula(() => result);
      });
    }
  }, [selectedDepartment, dataUpdate]);

  useEffect(() => {
    if (selectedDepartment !== undefined && selectedAula !== undefined) {
      getDevicesInAula(selectedDepartment, selectedAula, (result: any) => {
        setData(() =>
          result.map((cur: any, index: number) => ({ ...cur, id: index }))
        );
      });
    }
  }, [selectedAula, dataUpdate]);

  const deleteOrModifyData = (data: any) => {
    console.log("Crud devices: ", data);
    if (
      !data.row?.eui ||
      selectedDepartment === undefined ||
      selectedAula === undefined
    ) {
      return;
    }
    if (data.field === "delete") {
      deleteDevicesInAula(
        selectedDepartment,
        selectedAula,
        data.row?.eui,
        (result: any) => {
          if (!result.ok) {
            setDataUpdate(() => []);
            alarms((values) => [
              ...values,
              {
                errorCode: 500,
                message: "Unable to delete due to child references",
              },
            ]);
          }
          setDataUpdate(() => []);
        }
      );
      return;
    }
    if (data.field === "modify") {
      if (!data.row?.description) return;
      updateDevicesInAula(
        selectedDepartment,
        selectedAula,
        data.row?.eui,
        (result: any) => {
          setDataUpdate(() => []);
        },
        {
          aula: selectedAula,
          description: data.row?.description,
        }
      );
      return;
    }
  };

  const handleDialog = (open: boolean = false) => {
    setSelectedDeviceTypes(() => undefined);
    setDialogOpen(() => open);
  };

  const createNew = () => {
    if (!dialogRefName.current?.value && dialogRefName.current?.value == "") {
      return;
    }

    if (selectedDepartment && selectedAula && selectedDeviceTypes) {
      createDevicesInAula(
        selectedDepartment,
        selectedAula,
        (result: any) => {
          setDataUpdate(() => []);
        },
        {
          deviceEui: dialogRefName.current?.value,
          description:
            dialogRefDescription.current?.value || "No description provided",
          deviceTypeId: selectedDeviceTypes,
        }
      );
    }
    handleDialog(false);
  };

  const pfx = withPrefix("tfg");

  const { theme } = useTheme();

  return (
    <div className={cx(defaultStyle("tfg", theme), pfx("config-base-main"))}>
      <h1>Devices</h1>
      <div className={cx(pfx("config-base-container"))}>
        <div className={cx(pfx("config-base-container-before-action"))}>
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
        </div>
        {selectedDepartment !== undefined && selectedAula !== undefined && (
          <div className={pfx("config-base-container-after-action")}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleDialog(true)}
            >
              Create New
            </Button>
            <Dialog
              PaperProps={{
                style: {
                  backgroundColor: theme.backgroundCard,
                  color: theme.color,
                },
              }}
              open={dialogOpen}
              onClose={() => handleDialog()}
            >
              <DialogTitle>Add new Device</DialogTitle>
              <DialogContent>
                <DialogContentText
                  sx={{
                    backgroundColor: theme.backgroundCard,
                    color: theme.color,
                  }}
                >
                  Please provide the necesary information:
                </DialogContentText>
                <TextField
                  InputProps={{
                    style: {
                      color: theme.color,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: theme.disabledText,
                    },
                  }}
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  label="EUI"
                  type="text"
                  fullWidth
                  variant="standard"
                  inputRef={dialogRefName}
                />
                <FormControl variant="standard" fullWidth margin="dense">
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    sx={{
                      backgroundColor: theme.backgroundCard,
                      color: theme.disabledText,
                    }}
                  >
                    select te device type
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
                    labelId="deviceType"
                    id="deviceType"
                    label="Warning"
                    onChange={(event: any) =>
                      setSelectedDeviceTypes(() => event.target.value)
                    }
                    required
                  >
                    {deviceTypes &&
                      deviceTypes.map((cur) => {
                        return (
                          <MenuItem value={cur.id}>
                            {cur.id + " - " + cur.brand + " - " + cur.model}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <TextField
                  InputProps={{
                    style: {
                      color: theme.color,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: theme.disabledText,
                    },
                  }}
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  inputRef={dialogRefDescription}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleDialog()}>Cancel</Button>
                <Button
                  onClick={() => {
                    createNew();
                  }}
                >
                  Create
                </Button>
              </DialogActions>
            </Dialog>
            <CrudComponents
              data={data}
              columns={[
                { field: "id", type: "id" },
                {
                  field: "eui",
                  type: "name",
                  headerName: "EUI",
                  editable: false,
                },
                {
                  field: "type",
                  type: "number",
                  headerName: "Type",
                  editable: false,
                },
                { field: "description", type: "description" },
              ]}
              cbFunction={deleteOrModifyData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CrudDevices;
