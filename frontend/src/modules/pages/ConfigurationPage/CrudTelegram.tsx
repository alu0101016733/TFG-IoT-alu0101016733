import { CrudComponents } from "./CrudComponents";
import {
  createTelegram,
  deleteTelegram,
  getTelegram,
  updateTelegram,
} from "../../../backendComunication/config/telegram";
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
import CrudTelegramWarning from "./CrudTelegramWarning";
import { useTheme } from "../../ThemeProvider";
import { defaultStyle } from "./baseStyle";
import { cx } from "@emotion/css";
import { withPrefix } from "../../../tools/cssUtils";

const CrudTelegram = () => {
  console.log("Crud telegram");
  const [data, setData] = useState([] as any[]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const configWarning = useSetRecoilState(configWarningsAtom);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogWarnOpen, setDialogWarnOpen] = useState(false);
  const [dialogWarnOpenId, setDialogWarnOpenId] = useState(0);
  const dialogRefName = useRef<any>();
  const dialogRefDescription = useRef<any>();
  const dialogRefChatId = useRef<any>();

  useEffect(() => {
    getTelegram((result: any) => {
      setData(() => result);
    });
  }, [dataUpdate]);

  const deleteOrModifyData = (data: any) => {
    console.log("Crud department: ", data);
    if (!data.id) return;
    if (data.field === "delete") {
      deleteTelegram(data.id, (result: any) => {
        if (!result.ok) {
          setDataUpdate(() => []);
          configWarning((values) => [
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
      if (!data.row?.chatId) return;
      updateTelegram(
        data.id,
        (result: any) => {
          setDataUpdate(() => []);
        },
        {
          chatId: data.row?.chatId,
          name: data.row?.name,
          description: data.row?.description,
        }
      );
      return;
    }
    if (data.field === "add") {
      setDialogWarnOpenId(() => data.id);
      handleDialogWarn(true);
      return;
    }
  };

  const handleDialog = (open: boolean = false) => {
    setDialogOpen(() => open);
  };

  const handleDialogWarn = (open: boolean = false) => {
    setDialogWarnOpen(() => open);
  };

  const createNew = () => {
    if (
      !dialogRefChatId.current?.value &&
      dialogRefChatId.current?.value == ""
    ) {
      return;
    }

    createTelegram(
      (result: any) => {
        setDataUpdate(() => []);
      },
      {
        chatId: dialogRefChatId.current?.value,
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
      <h1>Telegram chats</h1>
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
          open={dialogWarnOpen}
          onClose={() => handleDialogWarn()}
        >
          <DialogTitle>Add new warnings</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ backgroundColor: theme.backgroundCard, color: theme.color }}
            >
              Selecting a warning will automatically add it to the current chat
            </DialogContentText>
            <CrudTelegramWarning chatId={dialogWarnOpenId} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogWarn()}>Cancel</Button>
          </DialogActions>
        </Dialog>
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
          <DialogTitle>Create new Telegram Warning Comunicator</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ backgroundColor: theme.backgroundCard, color: theme.color }}
            >
              Insert data for Telegram chat
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
              id="chatId"
              label="Chat ID"
              type="text"
              fullWidth
              variant="standard"
              inputRef={dialogRefChatId}
              sx={{ backgroundColor: theme.backgroundCard, color: theme.color }}
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
              field: "chatId",
              type: "number",
              headerName: "Chat ID",
              width: 150,
            },
            { field: "name", type: "name" },
            { field: "description", type: "description" },
          ]}
          operations={["modify", "add", "delete"]}
          cbFunction={deleteOrModifyData}
        />
      </div>
    </div>
  );
};

export default CrudTelegram;
