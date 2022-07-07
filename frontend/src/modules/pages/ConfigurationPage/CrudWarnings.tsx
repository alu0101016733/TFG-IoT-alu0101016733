import { CrudComponents } from "./CrudComponents";
import {
  createWarning,
  deleteWarning,
  getWarning,
  updateWarning,
} from "../../../backendComunication/config/warning";
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
import { getSensorId } from "../../../backendComunication/config/sensor";
import { defaultStyle } from "./baseStyle";
import { cx } from "@emotion/css";
import { withPrefix } from "../../../tools/cssUtils";
import { useTheme } from "../../ThemeProvider";

const CrudWarnings = () => {
  console.log("Crud warnings");
  const [data, setData] = useState([]);
  const [sensor, setSensor] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const alarms = useSetRecoilState(configWarningsAtom);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRefName = useRef<any>();
  const dialogRefDescription = useRef<any>();
  const dialogRefMax = useRef<any>();
  const dialogRefMin = useRef<any>();
  const dialogRefSensor = useRef<any>();
  const dialogRefMessage = useRef<any>();

  useEffect(() => {
    getWarning((result: any) => {
      setData(() => result);
    });
  }, [dataUpdate]);

  useEffect(() => {
    getSensorId((result: any) => {
      setSensor(() => result.map((current: { id: string }) => current["id"]));
      console.log(sensor);
      //dialogRefSensor.current = { value: sensor[0] };
    });
  }, [dataUpdate]);

  const deleteOrModifyData = (data: any) => {
    console.log("Crud department: ", data);
    if (!data.id) return;
    if (data.field === "delete") {
      deleteWarning(data.id, (result: any) => {
        if (!result.ok) {
          setDataUpdate(() => []);
          alarms((values) => [
            ...values,
            {
              errorCode: 500,
              message:
                "Unable to delete, Remove all Telegram subscription and try again",
            },
          ]);
        }
        setDataUpdate(() => []);
      });
      return;
    }
    if (data.field === "modify") {
      if (!data.row?.name || !data.row?.description) return;
      updateWarning(
        data.id,
        (result: any) => {
          setDataUpdate(() => []);
        },
        {
          name: data.row?.name,
          description: data.row?.description,
          max: data.row?.max,
          min: data.row?.min,
          message: data.row?.message,
        }
      );
      return;
    }
  };

  const handleDialog = (open: boolean = false) => {
    setDialogOpen(() => open);
  };

  const createNew = () => {
    if (!dialogRefName.current?.value && dialogRefName.current?.value == "") {
      return;
    }

    console.log(
      `Creating new warning: <${dialogRefName.current?.value}>,
      " -- ",
      <${dialogRefSensor.current?.value}>
    `
    );

    createWarning(
      (result: any) => {
        setDataUpdate(() => []);
      },
      {
        name: dialogRefName.current?.value,
        description:
          dialogRefDescription.current?.value || "No description provided",
        max: dialogRefMax.current?.value,
        min: dialogRefMin.current?.value,
        sensorId: dialogRefSensor.current?.value,
        message: dialogRefMessage.current?.value,
      }
    );
    handleDialog(false);
  };

  const pfx = withPrefix("tfg");

  const { theme } = useTheme();

  return (
    <div className={cx(defaultStyle("tfg", theme), pfx("config-base-main"))}>
      <h1>Warnings</h1>
      <div className={cx(pfx("config-base-container"))}>
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
          <DialogTitle>Create new Warning</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ backgroundColor: theme.backgroundCard, color: theme.color }}
            >
              Insert data for Warning
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
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              inputRef={dialogRefName}
            />
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
              multiline
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              inputRef={dialogRefDescription}
            />
            <FormControl variant="standard" fullWidth margin="dense">
              <InputLabel
                sx={{
                  backgroundColor: theme.backgroundCard,
                  color: theme.disabledText,
                }}
                id="demo-simple-select-standard-label"
              >
                For Sensor
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
                labelId="sensor-selection"
                id="sensor-select"
                value={dialogRefSensor.current?.value}
                label="Sensor"
                inputRef={dialogRefSensor}
              >
                {sensor.map((name) => (
                  <MenuItem value={name}>{name}</MenuItem>
                ))}
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
              required
              margin="dense"
              id="max"
              label="Max"
              type="number"
              variant="standard"
              inputRef={dialogRefMax}
            />
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
              required
              margin="dense"
              id="min"
              label="Min"
              type="number"
              variant="standard"
              inputRef={dialogRefMin}
            />
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
              multiline
              fullWidth
              margin="dense"
              id="Message"
              label="Message"
              type="text"
              variant="standard"
              inputRef={dialogRefMessage}
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
            { field: "name", type: "name" },
            { field: "max", type: "number", headerName: "Max" },
            { field: "min", type: "number", headerName: "Min" },
            {
              field: "sensorId",
              type: "name",
              headerName: "Sensor",
              editable: false,
            },
            { field: "description", type: "description" },
            { field: "message", type: "description", headerName: "Message" },
          ]}
          cbFunction={deleteOrModifyData}
        />
      </div>
    </div>
  );
};

export default CrudWarnings;
