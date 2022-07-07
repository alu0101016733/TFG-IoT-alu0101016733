import { css } from "@emotion/css";
import { ThemeType } from "../ThemeProvider";

export const defaultStyle = (pfx: string, theme: ThemeType) => css`
  &.${pfx}-base-layout-main {
    background-color: ${theme.background};
    color: ${theme.color};
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .${pfx}-header {
      flex-grow: 0;
      background-color: ${theme.baseColor.middle};
    }

    .${pfx}-body {
      display: flex;
      flex-direction: row;
      height: calc(100vh - 55px);
    }

    .${pfx}-left-side {
      flex-grow: 0;
    }

    .${pfx}-body-center {
      width: 100%;
      position: relative;
      overflow: auto;
    }

    .${pfx}-right-side {
      flex-grow: 0;
    }
  }
`;
