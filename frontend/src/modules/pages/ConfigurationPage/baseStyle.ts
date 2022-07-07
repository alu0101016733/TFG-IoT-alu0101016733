import { css } from "@emotion/css";
import { ThemeType } from "../../ThemeProvider";

export const defaultStyle = (pfx: string, theme: ThemeType) => css`
  &.${pfx}-config-base-main {
    margin: auto;
    margin-top: 50px;
    max-width: 1600px;

    .${pfx}-config-base-container {
      margin-top: 25px;
      background-color: ${theme.backgroundCard};
      padding: 10px;
      border-radius: 5px;
      position: relative;
    }

    .${pfx}-config-base-container>button,
      .${pfx}-config-base-container-after-action>button {
      margin: 10px;
    }

    .${pfx}-config-base-container-before-action>div {
      margin-top: 20px;
    }

    .${pfx}-last-button-from-sensor-placement {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin: 20px;
      margin-bottom: 0px;
    }
  }
`;
