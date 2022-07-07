import { cx } from "@emotion/css";
import { Cancel, Close } from "@material-ui/icons";
import { DragEventHandler, FC, useState, DragEvent } from "react";
import { useRecoilState } from "recoil";
import { rightSidebarAtom } from "../../atoms/base-layout-atoms";
import { withPrefix } from "../../tools/cssUtils";
import { useTheme } from "../ThemeProvider";
import { defaultStyle } from "./RightSidebar.style";
import AlertsSidebar from "./RightSidebarContent/AlertsSidebar";
import ConfigSidebar from "./RightSidebarContent/ConfigSidebar";

export type RightSidebarOpenStates = undefined | "alerts" | "config";

type RightSidebarProps = {
  prefix?: string;
  defaultOpen?: RightSidebarOpenStates;
};

export const RightSidebar: FC<RightSidebarProps> = ({
  prefix = "tfg",
  defaultOpen,
  ...props
}) => {
  console.log("Right side bar");
  const pfx = withPrefix(prefix);

  const [sidebarState, setSidebarState] = useRecoilState(rightSidebarAtom);
  const [baseWidth, setBaseWidth] = useState(300);
  const [width, setWidth] = useState(baseWidth);
  const [dragTravel, setDragTravel] = useState(0);

  const onDragWidthStart = (event: DragEvent<HTMLDivElement>) => {
    setDragTravel(() => event.clientX);
  };

  const onDragWidth = (event: DragEvent<HTMLDivElement>) => {
    const newWidth = baseWidth + (dragTravel - event.clientX);
    if (event.clientX !== 0 && newWidth > 240) {
      setWidth(() => newWidth);
    }
  };

  const onDragWidthEnd = (event: DragEvent<HTMLDivElement>) => {
    let newWidth = baseWidth + (dragTravel - event.clientX);
    newWidth = newWidth > 240 ? newWidth : 240;
    setWidth(() => newWidth);
    setBaseWidth(() => newWidth);
  };

  const { theme } = useTheme();

  return (
    <div
      className={cx(
        defaultStyle(prefix, theme, width),
        pfx("right-sidebar-main"),
        {}
      )}
    >
      <div
        className={pfx("change-width-handler")}
        draggable
        onDragStart={onDragWidthStart}
        onDrag={onDragWidth}
        onDragEnd={onDragWidthEnd}
      ></div>
      <Close
        className={pfx("close-button")}
        onClick={() => setSidebarState(undefined)}
      />
      <div
        className={cx(defaultStyle(prefix, theme), pfx("right-sidebar"), {
          [pfx("completly-hidden")]: sidebarState === undefined,
        })}
      >
        <div
          className={cx(pfx("alerts-drawer"), pfx("drawer"), {
            [pfx("show-drawer")]: sidebarState === "alerts",
          })}
        >
          <AlertsSidebar></AlertsSidebar>
        </div>
        <div
          className={cx(pfx("config-drawer"), pfx("drawer"), {
            [pfx("show-drawer")]: sidebarState === "config",
          })}
        >
          <ConfigSidebar></ConfigSidebar>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
