import { FC, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { configWarningsAtom } from "../../../atoms/registered-alarms-atoms";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import {
  createTelegramWarning,
  deleteTelegramWarning,
  getTelegramWarning,
} from "../../../backendComunication/config/telegramToWarning";
import { getWarning } from "../../../backendComunication/config/warning";
import { useTheme } from "../../ThemeProvider";

type CrudTelegramWarningProps = {
  chatId: number;
};

const CrudTelegramWarning: FC<CrudTelegramWarningProps> = ({
  chatId,
  ...props
}) => {
  console.log("Crud telegram warning relation");
  const [telWarnRef, setTelWarnRef] = useState([] as number[]);
  const [telWarnRefName, setTelWarnRefName] = useState([]);
  const [warningId, setWarningId] = useState([] as any[]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const configWarning = useSetRecoilState(configWarningsAtom);

  useEffect(() => {
    getTelegramWarning(chatId, (result: any) => {
      setTelWarnRef(() => result.map((curRef: any) => curRef.warningId));
      setTelWarnRefName(() => result.map((curRef: any) => curRef.warningName));
    });
  }, [dataUpdate]);

  useEffect(() => {
    getWarning((result: any) => {
      setWarningId(() => result);
    });
  }, [dataUpdate]);

  const deleteTelegramHandler = (warningId: number) => {
    return () =>
      deleteTelegramWarning(chatId, warningId, (result: any) => {
        console.log(result);
        if (!result.ok) {
          setDataUpdate(() => []);
          configWarning((values) => [...values, { errorCode: 500 }]);
        }
        setDataUpdate(() => []);
      });
  };

  const createNew = (event: any) => {
    console.log(event);
    createTelegramWarning(
      chatId,
      (result: any) => {
        setDataUpdate(() => []);
      },
      {
        warningId: event.target.value,
      }
    );
  };

  const { theme } = useTheme();

  return (
    <>
      <h4>Add:</h4>
      <FormControl variant="standard" fullWidth margin="dense">
        <InputLabel
          id="demo-simple-select-standard-label"
          sx={{
            backgroundColor: theme.backgroundCard,
            color: theme.disabledText,
          }}
        >
          Include warning
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
          onChange={createNew}
        >
          {warningId.map((name) => {
            if (!telWarnRef.includes(name.id)) {
              return (
                <MenuItem value={name.id}>
                  {name.id + " - " + name.name}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
      <Box sx={{ m: 4 }} />
      <h4>Current subscriptions:</h4>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: theme.backgroundCard, color: theme.color }}
      >
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: theme.backgroundCard,
                  color: theme.color,
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: theme.backgroundCard,
                  color: theme.color,
                }}
                align="right"
              >
                Remove
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {telWarnRefName.map((name, index) => {
              return (
                <TableRow
                  key={name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      backgroundColor: theme.backgroundCard,
                      color: theme.color,
                    }}
                    component="th"
                    scope="row"
                  >
                    {name}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.backgroundCard,
                      color: theme.color,
                    }}
                    align="right"
                  >
                    <Button
                      onClick={deleteTelegramHandler(telWarnRef[index])}
                      size="small"
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CrudTelegramWarning;
