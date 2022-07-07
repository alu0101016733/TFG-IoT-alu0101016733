import { cx } from "@emotion/css";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { sensorWarningsAtom } from "../../../atoms/registered-alarms-atoms";
import { withPrefix } from "../../../tools/cssUtils";
import { useTheme } from "../../ThemeProvider";
import { defaultStyle } from "./AlertsSidebar.style";

export type AlertsSidebarProps = {
  prefix?: string;
  minWidth?: number;
};

export const AlertsSidebar: FC<AlertsSidebarProps> = ({
  prefix = "tfg",
  minWidth = 240,
  ...props
}) => {
  const [alarms, setAlarms] = useRecoilState(sensorWarningsAtom);

  const pfx = withPrefix(prefix);

  const { theme } = useTheme();

  const removeAlert = (position: number) => {
    return () => {
      setAlarms((alarms) =>
        alarms.slice(0, position).concat(alarms.slice(position + 1))
      );
    };
  };

  return (
    <div className={cx(defaultStyle(prefix), pfx("base-alerts-sidebar"))}>
      <h1 className={pfx("title")}>Alerts</h1>
      {alarms
        .slice(0)
        .reverse()
        .map((item, index) => (
          <div key={item.warningId + "-" + item.historyId}>
            <Card
              sx={{
                minWidth: minWidth,
                backgroundColor: theme.backgroundCard,
                color: theme.color,
              }}
              className={pfx("alert-card")}
            >
              <CardContent>
                <h4>
                  {item.message} ({item.value})
                </h4>
                <p>Department: {item.department}</p>
                <p>Aula: {item.aula}</p>
              </CardContent>
              <CardActions className={pfx("alert-card-action")}>
                <Button onClick={removeAlert(index)} size="small">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default AlertsSidebar;
