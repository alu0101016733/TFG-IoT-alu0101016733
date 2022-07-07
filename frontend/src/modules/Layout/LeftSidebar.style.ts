import { css } from "@emotion/css";
import { hexToRgb } from "../../tools/cssUtils";
import { ThemeType } from "../ThemeProvider";

export const defaultStyle = (pfx: string, theme: ThemeType) => css`
  &.${pfx}-left-sidebar-main {
    height: 100%;
    overflow: hidden;
    position: relative;
    min-width: 240px;
    background-color: ${(() => {
      const rgb = hexToRgb(theme.color);
      const inString =
        "rgba(" + rgb?.r + "," + rgb?.g + "," + rgb?.b + ", 0.2);";
      console.log(inString);
      return inString;
    })()};

    .${pfx}-left-sidebar-menu-entry {
      margin: 5px;
      margin-top: 10px;
      background-color: ${theme.baseColor.light};
    }
  }
`;
