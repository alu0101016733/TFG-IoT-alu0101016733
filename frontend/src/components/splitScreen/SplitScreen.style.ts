import { css } from "@emotion/css";

export const defaultStyle = (pfx: string, flexBasis: number = 30) => css`
  &.${pfx}-split-screen {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 2px;

    .${pfx}-blocks {
      width: 100%;
      height: 100%;
      display: flex;
    }

    .${pfx}-divider-container {
      padding: 5px;
    }

    .${pfx}-divider {
      background-color: #aaa;
      height: 100%;
      width: 100%;
    }

    .${pfx}-divider-drag-div {
      padding: 2px;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    .${pfx}-vertical-divider {
      cursor: row-resize;
    }

    .${pfx}-horizontal-divider {
      cursor: col-resize;
    }

    .${pfx}-vertical-blocks {
      flex-direction: column;
    }

    .${pfx}-horizontal-blocks {
      flex-direction: row;
    }

    .${pfx}-page-presenting-div {
      display: flex;
      flex-direction: column;
      //border: 2px solid #222;
      border-radius: 5px;
      box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.2);
    }

    .${pfx}-block-100,.${pfx}-block {
      width: 100%;
      height: 100%;
    }

    .${pfx}-block {
      border-radius: 5px;
      overflow: hidden;
    }

    .${pfx}-block-one {
      flex-basis: ${flexBasis}%;
    }

    .${pfx}-block-two {
      flex-basis: ${100 - flexBasis}%;
    }

    .${pfx}-top-bar {
      position: absolute;
      right: 5px;
      top: 5px;
      display: flex;
      justify-content: flex-end;
    }

    .${pfx}-horizontal-split {
      transform: rotate(90deg);
    }

    .${pfx}-top-bar > div {
      //border: 1px solid #222;
      background-color: rgba(0, 0, 0, 0.2);
      margin-left: 3px;
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.8);
      border-radius: 5px;
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .${pfx}-top-bar > div:hover {
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }
`;
