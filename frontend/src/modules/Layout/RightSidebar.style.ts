import { css } from "@emotion/css";
import { hexToRgb } from "../../tools/cssUtils";
import { ThemeType } from "../ThemeProvider";

const ANIMATION_TIME = "0.25s";
const ANIMATION = `${ANIMATION_TIME} linear`;

export const defaultStyle = (
  pfx: string,
  theme: ThemeType,
  width: number = 260
) => {
  const NAVBAR_WIDTH = `${width}px`;

  return css`
    &.${pfx}-right-sidebar-main {
      height: 100%;
      overflow: hidden;
      position: relative;
      overflow-y: auto;
      background-color: ${(() => {
        const rgb = hexToRgb(theme.color);
        const inString =
          "rgba(" + rgb?.r + "," + rgb?.g + "," + rgb?.b + ", 0.2);";
        console.log(inString);
        return inString;
      })()};
      display: flex;
      flex-direction: row;

      .${pfx}-change-width-handler {
        width: 5px;
        background-color: rgba(255, 255, 255, 0.2);
      }

      .${pfx}-change-width-handler:hover {
        cursor: col-resize;
      }

      .${pfx}-close-button {
        position: fixed;
        z-index: 20;
        font-size: 40px;
        cursor: pointer;
      }

      .${pfx}-right-sidebar {
        height: 100%;
        width: ${NAVBAR_WIDTH};
        margin-right: 0;
        transition: margin-right ${ANIMATION};
        position: relative;
      }

      .${pfx}-right-sidebar>div {
        height: 100%;
        width: ${NAVBAR_WIDTH};
        position: absolute;
      }

      .${pfx}-completly-hidden {
        transition: margin-right ${ANIMATION};
        margin-right: calc(-${NAVBAR_WIDTH} - 6px);
        overflow: hidden;
      }

      .${pfx}-drawer {
        transition: right ${ANIMATION};
        transition-delay: ${ANIMATION_TIME};
        right: -${NAVBAR_WIDTH};
      }

      .${pfx}-drawer.${pfx}-show-drawer {
        transition-delay: 0s;
        right: 0;
        z-index: 10;
      }

      .${pfx}-alerts-drawer {
      }

      .${pfx}-config-drawer {
      }
    }
  `;
};
