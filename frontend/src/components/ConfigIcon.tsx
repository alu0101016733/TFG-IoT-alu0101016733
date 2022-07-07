import { Badge, IconButton } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { configWarningsAtom } from "../atoms/registered-alarms-atoms";
import { Settings } from "@material-ui/icons";
import { rightSidebarAtom } from "../atoms/base-layout-atoms";

const ConfigIcon = () => {
  console.log("ConfigIcon");
  const alarms = useRecoilValue(configWarningsAtom);

  const [sidebarState, setSidebarState] = useRecoilState(rightSidebarAtom);

  const toggleSidebarState = () => {
    if (sidebarState === "config") {
      setSidebarState(undefined);
      return;
    }
    setSidebarState("config");
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
      <Badge badgeContent={alarms.length} color="warning">
        <Settings />
      </Badge>
    </IconButton>
  );
};

export default ConfigIcon;
