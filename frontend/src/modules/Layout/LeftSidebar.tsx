import { cx } from "@emotion/css";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { withPrefix } from "../../tools/cssUtils";
import { useTheme } from "../ThemeProvider";
import { defaultStyle } from "./LeftSidebar.style";

export type LeftNavigationItems = {
  name: string;
  path: string;
  item: ReactNode;
};

type LeftSidebarProps = {
  navigation?: LeftNavigationItems[];
  prefix?: string;
};

export const LeftSidebar: FC<LeftSidebarProps> = ({
  navigation = [],
  prefix = "tfg",
  ...props
}) => {
  console.log("Left side bar");
  const pfx = withPrefix(prefix);

  let navigate = useNavigate();

  const { theme } = useTheme();

  return (
    <div
      className={cx(defaultStyle(prefix, theme), pfx("left-sidebar-main"), {})}
    >
      <List>
        {navigation.map((item, index) => {
          return (
            <div className={cx(pfx("left-sidebar-menu-entry"))} key={index}>
              <ListItem disablePadding onClick={() => navigate(item.path)}>
                <ListItemButton>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default LeftSidebar;
