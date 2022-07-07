import { FC, ReactNode } from "react";
import { withPrefix } from "../../tools/cssUtils";
import { cx } from "@emotion/css";
import { BaseHeader } from "./BaseHeader";
import { defaultStyle } from "./BaseLayout.style";
import { RightSidebar } from "./RightSidebar";
import { useTheme } from "../ThemeProvider";

export type BaseLayoutProps = {
  prefix?: string;
  header?: ReactNode;
  leftBlock?: ReactNode;
  rightBlock?: ReactNode;
  children?: ReactNode;
};

export const BaseLayout: FC<BaseLayoutProps> = ({
  prefix = "tfg",
  header = <BaseHeader />,
  leftBlock,
  rightBlock = <RightSidebar />,
  children = <div>BASE LAYOUT CHILD</div>,
  ...props
}) => {
  console.log("base layout");
  const pfx = withPrefix(prefix);

  const currentTheme = useTheme();

  return (
    <div
      className={cx(
        defaultStyle(prefix, currentTheme.theme),
        pfx("base-layout-main")
      )}
    >
      <div className={pfx("header")}>{header}</div>
      <div className={pfx("body")}>
        <div className={pfx("left-side")}>{leftBlock}</div>
        <div className={pfx("body-center")}>{children}</div>
        <div className={pfx("right-side")}>{rightBlock}</div>
      </div>
    </div>
  );
};

export default BaseLayout;
