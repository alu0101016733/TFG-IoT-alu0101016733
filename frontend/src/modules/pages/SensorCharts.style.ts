import { css } from "@emotion/css";
import { ThemeType } from "../ThemeProvider";

export const defaultStyle = (pfx: string, theme: ThemeType) => css`
  &.${pfx}-sensor-charts {
    width: 100%;
    height: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background-color: ${theme.backgroundCard};
    color: ${theme.color};

    .${pfx}-select-div {
    }

    .${pfx}-chart-div {
      height: 100%;
    }

    .${pfx}-select {
      margin-right: 10px;
    }
  }
`;
