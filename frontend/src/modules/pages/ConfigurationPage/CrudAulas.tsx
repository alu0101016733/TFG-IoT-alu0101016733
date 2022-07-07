import { CrudComponents } from "./CrudComponents";
import {
  createAula,
  updateAula,
  deleteAula,
  getAula,
} from "../../../backendComunication/config/aulas";
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

const CrudAulas = () => {
  console.log("Crud aulas");
  const [department, setDepartment] = useState([] as any[]);
  const [selectedDepartment, setSelectedDepartment] = useState(
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
  }, [dataUpdate]);

  useEffect(() => {
    if (selectedDepartment !== undefined) {
      getAula(selectedDepartment, (result: any) => {
        setData(() => result);
      });
    }
  }, [selectedDepartment, dataUpdate]);

  const deleteOrModifyData = (data: any) => {
    // console.log("Crud department: ", data);
    if (!data.id || selectedDepartment === undefined) return;
    if (data.field === "delete") {
      deleteAula(selectedDepartment, data.id, (result: any) => {
        if (!result.ok) {
          setDataUpdate(() => []);
          alarms((values) => [...values, { errorCode: 500 }]);
        }
        setDataUpdate(() => []);
      });
      return;
    }
    if (data.field === "modify") {
      if (!data.row?.name || !data.row?.description) return;
      updateAula(
        selectedDepartment,
        data.id,
        (result: any) => {
          setDataUpdate(() => []);
        },
        {
          name: data.row?.name,
          description: data.row?.description,
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

    if (selectedDepartment) {
      createAula(
        selectedDepartment,
        (result: any) => {
          setDataUpdate(() => []);
        },
        {
          name: dialogRefName.current?.value,
          description:
            dialogRefDescription.current?.value || "No description provided",
        }
      );
    }
    handleDialog(false);
  };

  const pfx = withPrefix("tfg");

  const { theme } = useTheme();

  return (
    <div className={cx(defaultStyle("tfg", theme), pfx("config-base-main"))}>
      <h1>Aulas</h1>
      <div className={cx(pfx("config-base-container"))}>
        <div className={cx(pfx("config-base-container-before-action"))}>
          <h2>Select department</h2>
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
        </div>
        {selectedDepartment !== undefined && (
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
              <DialogTitle>Create new Aula</DialogTitle>
              <DialogContent>
                <DialogContentText
                  sx={{
                    backgroundColor: theme.backgroundCard,
                    color: theme.color,
                  }}
                >
                  Please provide a name and a description for the new Aula
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
                { field: "name", type: "name" },
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

export default CrudAulas;
