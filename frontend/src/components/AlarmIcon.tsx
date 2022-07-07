import { Badge, IconButton } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { sensorWarningsAtom } from "../atoms/registered-alarms-atoms";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { Notifications } from "@material-ui/icons";
import { rightSidebarAtom } from "../atoms/base-layout-atoms";

const AlarmIcon = () => {
  console.log("AlarmIcon");
  const alarms = useRecoilValue(sensorWarningsAtom);

  const [sidebarState, setSidebarState] = useRecoilState(rightSidebarAtom);

  const toggleSidebarState = () => {
    if (sidebarState === "alerts") {
      setSidebarState(undefined);
      return;
    }
    setSidebarState("alerts");
  };

  return (
    <IconButton
      size="large"
      aria-label={
        alarms.length > 0
          ? `show ${alarms.length} new notifications`
          : "notifications"
      }
      onClick={toggleSidebarState}
    >
      <Badge badgeContent={alarms.length} color="error">
        {alarms.length > 0 ? <NotificationImportantIcon /> : <Notifications />}
      </Badge>
    </IconButton>
  );
};

export default AlarmIcon;
