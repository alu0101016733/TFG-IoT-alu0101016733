import { css } from "@emotion/css";
import { ThemeType } from "../ThemeProvider";

export const defaultStyle = (pfx: string, theme: ThemeType) => css`
  &.${pfx}-base-header-main {
    .MuiToolbar-root {
      min-height: 55px;
      padding-left: 0px;
      align-items: stretch;
    }
    .${pfx}-nav-item {
      display: flex;
      align-items: center;
      padding: 0px 10px;
      cursor: pointer;
    }

    .${pfx}-nav-item-link {
      background-color: ${theme.baseColor.dark};
    }

    .${pfx}-home-logo {
      background-color: ${theme.baseColor.dark};
    }

    .${pfx}-nav-item:hover {
      filter: brightness(120%);
    }

    .${pfx}-right-icon-container {
      display: flex;
      align-items: center;
    }
  }
`;
