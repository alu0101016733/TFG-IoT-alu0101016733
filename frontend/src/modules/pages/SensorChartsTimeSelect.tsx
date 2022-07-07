import {
  Box,
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
import { FC, useRef, useState } from "react";
import { hoursToMiliseconds } from "../../tools/timeConverter";
import { padTo2Digits } from "../../tools/unixToTime";
import { useTheme } from "../ThemeProvider";

const getCurrentTimeForInput = (minusHours: number = 0) => {
  const date = new Date();
  date.setHours(date.getHours() - minusHours);
  const dateStr = `${date.getFullYear()}-${padTo2Digits(
    date.getMonth() + 1
  )}-${padTo2Digits(date.getDate())}T${padTo2Digits(
    date.getHours()
  )}:${padTo2Digits(date.getMinutes())}`;
  return dateStr;
};

type SensorChartsTimeSelectProps = {
  from: number;
  to: number | undefined;
  callback: (from: number, to?: number) => void;
};

export const SensorChartsTimeSelect: FC<SensorChartsTimeSelectProps> = ({
  from,
  to,
  callback,
  ...props
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState("none" as "last" | "between" | "none");
  const dialogRefLast = useRef<any>();
  const dialogRefFrom = useRef<any>();
  const dialogRefTo = useRef<any>();

  const handleDialog = (open: boolean = false) => {
    setDialogOpen(() => open);
  };

  const setNewValues = () => {
    if (mode === "last" && dialogRefLast.current?.value) {
      callback(hoursToMiliseconds(dialogRefLast.current?.value));
    }
    if (mode === "between") {
      const from =
        new Date().getTime() - new Date(dialogRefFrom.current?.value).getTime();
      const to =
        new Date().getTime() - new Date(dialogRefTo.current?.value).getTime();

      callback(from, to);

      //console.log("Setting time from: ", from, "To: ", to);
    }
    handleDialog(false);
  };

  const { theme } = useTheme();

  return (
    <div>
      <Button variant="outlined" onClick={() => handleDialog(true)}>
        Time range
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
        <DialogTitle>Define time range for current chart</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ backgroundColor: theme.backgroundCard, color: theme.color }}
          >
            There are two modes available:
          </DialogContentText>
          <FormControl variant="standard" fullWidth margin="dense">
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{
                backgroundColor: theme.backgroundCard,
                color: theme.disabledText,
              }}
            >
              What mode
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
              sx={{
                backgroundColor: "inherit",
                color: "inherit",
                ".MuiSelect-icon": {
                  color: theme.color,
                },
              }}
              labelId="Include-Warning"
              id="warning-select"
              label="Warning"
              onChange={(event: any) => {
                setMode(() => event.target.value);
              }}
            >
              <MenuItem value={"last"}>Last Hours</MenuItem>
              <MenuItem value={"between"}>Define range</MenuItem>
            </Select>
          </FormControl>
          {mode === "last" && (
            <>
              <FormControl variant="standard" fullWidth margin="dense">
                <DialogContentText
                  sx={{
                    backgroundColor: theme.backgroundCard,
                    color: theme.color,
                  }}
                >
                  Type how many hours you would like to go back
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
                  required
                  id="min"
                  label="Between X hours and now (updating constantly)"
                  type="number"
                  variant="standard"
                  inputRef={dialogRefLast}
                />
              </FormControl>
            </>
          )}
          {mode === "between" && (
            <FormControl variant="standard" fullWidth margin="dense">
              <DialogContentText
                sx={{
                  backgroundColor: theme.backgroundCard,
                  color: theme.color,
                }}
              >
                Please select the range you want to display
              </DialogContentText>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  InputProps={{
                    style: {
                      color: theme.color,
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      color: theme.color,
                    },
                  }}
                  id="datetime-local"
                  label="From"
                  type="datetime-local"
                  defaultValue={getCurrentTimeForInput(26)}
                  inputRef={dialogRefFrom}
                />
                <TextField
                  InputProps={{
                    style: {
                      color: theme.color,
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      color: theme.color,
                    },
                  }}
                  id="datetime-local"
                  label="To"
                  type="datetime-local"
                  defaultValue={getCurrentTimeForInput(2)}
                  sx={{
                    width: 250,
                  }}
                  inputRef={dialogRefTo}
                />
              </Box>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={setNewValues}>Set Time</Button>
          <Button onClick={() => handleDialog()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SensorChartsTimeSelect;
