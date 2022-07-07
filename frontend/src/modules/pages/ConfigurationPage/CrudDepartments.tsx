import { CrudComponents } from "./CrudComponents";
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  updateDepartment,
} from "../../../backendComunication/config/departments";
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
  TextField,
} from "@mui/material";
import { defaultStyle } from "./baseStyle";
import { cx } from "@emotion/css";
import { withPrefix } from "../../../tools/cssUtils";
import { useTheme } from "../../ThemeProvider";

const CrudDepartments = () => {
  console.log("Crud departments");
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const alarms = useSetRecoilState(configWarningsAtom);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRefName = useRef<any>();
  const dialogRefDescription = useRef<any>();

  useEffect(() => {
    getDepartment((result: any) => {
      setData(() => result);
    });
  }, [dataUpdate]);

  const deleteOrModifyData = (data: any) => {
    console.log("Crud department: ", data);
    if (!data.id) return;
    if (data.field === "delete") {
      deleteDepartment(data.id, (result: any) => {
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
      updateDepartment(
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

    console.log(
      `Creating new department: <${dialogRefName.current?.value}>,
      " -- ",
      <${dialogRefDescription.current?.value}>
    `
    );

    createDepartment(
      (result: any) => {
        setDataUpdate(() => []);
      },
      {
        name: dialogRefName.current?.value,
        description:
          dialogRefDescription.current?.value || "No description provided",
      }
    );
    handleDialog(false);
  };

  const pfx = withPrefix("tfg");

  const { theme } = useTheme();

  return (
    <div className={cx(defaultStyle("tfg", theme), pfx("config-base-main"))}>
      <h1>Departments</h1>
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
          <DialogTitle>Create new Department</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ backgroundColor: theme.backgroundCard, color: theme.color }}
            >
              Please provide a name and a description for the new Department
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
    </div>
  );
};

export default CrudDepartments;
