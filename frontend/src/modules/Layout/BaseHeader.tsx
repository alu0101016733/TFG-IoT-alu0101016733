import { AppBar, Toolbar, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import AlarmIcon from "../../components/AlarmIcon";
import ConfigIcon from "../../components/ConfigIcon";
import { useNavigate } from "react-router-dom";
import { withPrefix } from "../../tools/cssUtils";
import { cx } from "@emotion/css";
import { defaultStyle } from "./BaseHeader.style";
import { useTheme } from "../ThemeProvider";

export type NavigationItems = {
  name: string;
  path: string;
};

export type BaseHeaderProps = {
  links?: NavigationItems[];
  prefix?: string;
  logo?: ReactNode;
};

export const BaseHeader: FC<BaseHeaderProps> = ({
  links = [],
  prefix = "tfg",
  logo,
  ...props
}) => {
  console.log("base header");
  const pfx = withPrefix(prefix);

  let navigate = useNavigate();

  const { theme } = useTheme();

  return (
    <AppBar
      className={cx(defaultStyle(prefix, theme), pfx("base-header-main"))}
      position="static"
      sx={{
        backgroundColor: "inherit",
        color: "inherit",
      }}
    >
      <Toolbar>
        <div
          className={cx(pfx("home-logo"), pfx("nav-item"))}
          onClick={() => navigate("/")}
        >
          {logo ? logo : <h2>Home</h2>}
        </div>
        {links.map((item, index) => {
          return (
            <div
              key={index}
              className={cx(pfx("nav-item"), pfx("nav-item-link"))}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </div>
          );
        })}

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <div className={pfx("right-icon-container")}>
          <AlarmIcon />
          <ConfigIcon />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default BaseHeader;
