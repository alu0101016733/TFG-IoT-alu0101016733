import { css } from "@emotion/css";

export const defaultStyle = (pfx: string) => css`
  &.${pfx}-base-config-sidebar {
    width: 100%;
    .${pfx}-title {
      text-align: center;
    }

    .${pfx}-alert-card {
      margin: 4px;
    }
    .${pfx}-alert-card-action {
      display: flex;
      justify-content: flex-end;
    }
  }
`;
