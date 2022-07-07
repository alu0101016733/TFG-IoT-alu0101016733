import {
  FC,
  useState,
  useEffect,
  cloneElement,
  ReactElement,
  DragEvent,
  useRef,
  useMemo,
} from "react";
import { cx } from "@emotion/css";
import { defaultStyle } from "./SplitScreen.style";
import { withPrefix } from "../../tools/cssUtils";
import { Splitscreen, SplitscreenTwoTone } from "@mui/icons-material";
import { Close } from "@material-ui/icons";

type splitDirection = "vertical" | "horizontal" | undefined;
type activeIdType = string | undefined;

type InternalSplitScreenProps = {
  id: string;
  defaultPage?: ReactElement;
  prefix?: string;
  onClose: (id: string) => void;
  closeId?: string;
  storeLocally?: boolean;
  level?: number;
  // to send rerender to level 0 so that it can inform all upwards
  rerenderFromRoot?: () => void;
  // to signal rerender upwards
  bubbleUp?: number;
};

const InternalSplitScreen: FC<InternalSplitScreenProps> = ({
  id,
  defaultPage = <div>CONTENT</div>,
  prefix = "isp",
  onClose = (id: string) => {},
  closeId = "",
  storeLocally = true,
  level = 0,
  rerenderFromRoot = () => {},
  bubbleUp = 0,
  ...props
}) => {
  // style prefix
  const internalId = "internal" + id + level;
  const pfx = withPrefix(prefix);

  // in which direction it should split
  const [splitDirection, setSplitDirection] = useState(
    undefined as splitDirection
  );
  // flexbasis
  const [flexBasis, setFlexBasis] = useState(50);
  const parentRef = useRef({} as HTMLDivElement);
  // which field is the active one (stored depends on splitDirection)
  const [activeId, setActiveId] = useState(undefined as activeIdType);

  // state to rerender children if necessary
  const [rerender, setRerender] = useState([]);

  // used to retain last state of bubble upvalue
  const [lastBubbled, setLastBubbled] = useState(bubbleUp);

  const bubbleRenderToRoot = () => {
    rerenderFromRoot();
    setRerender(() => []);

    if (level === 0) {
      setLastBubbled((bubbleCounter) => bubbleCounter + 1);
    }
  };

  useEffect(() => {
    if (storeLocally) {
      const fromStorage = localStorage.getItem(internalId);
      if (fromStorage) {
        const parsed = JSON.parse(fromStorage);
        setSplitDirection(() => parsed.direction);
        setActiveId(() => parsed.activeId);
        setFlexBasis(() => parsed.flexBasis);
      }
    }
  }, []);

  useEffect(() => {
    if (storeLocally && (splitDirection || activeId)) {
      localStorage.setItem(
        internalId,
        JSON.stringify({
          direction: splitDirection,
          activeId: activeId,
          flexBasis: flexBasis,
        })
      );
    }
  }, [splitDirection, flexBasis]);

  const splitCurrentVertical = () => {
    setSplitDirection(() => "vertical");
  };

  const splitCurrentHorizontal = () => {
    setSplitDirection(() => "horizontal");
  };

  const handleClosing = (id: string) => {
    if (id !== "") {
      setActiveId(() => id);
      setSplitDirection(() => undefined);
    }
  };

  const dragHandler = (direction: splitDirection) => {
    return (event: DragEvent<HTMLDivElement>) => {
      // horizontal position in percent
      const hPp = Math.floor(
        ((event.clientX - parentRef.current.getBoundingClientRect().left) *
          100) /
          parentRef.current.clientWidth
      );
      // vertical position in percentage
      const vPp = Math.floor(
        ((event.clientY - parentRef.current.getBoundingClientRect().top) *
          100) /
          parentRef.current.clientHeight
      );
      if (direction === "horizontal") {
        if (hPp < 10 || hPp > 90) return;
      } else {
        if (vPp < 10 || vPp > 90) return;
      }
      const percentage = direction === "horizontal" ? hPp : vPp;
      setFlexBasis(() => percentage);
    };
  };

  // option menu
  const TopBar = useMemo(() => {
    return (
      <div className={pfx("top-bar")}>
        <div onClick={splitCurrentVertical} className={pfx("vertical-split")}>
          <SplitscreenTwoTone />
        </div>
        <div
          onClick={splitCurrentHorizontal}
          className={pfx("horizontal-split")}
        >
          <SplitscreenTwoTone />
        </div>
        <div
          onClick={() => {
            onClose(closeId);
          }}
          className={pfx("close")}
        >
          <Close />
        </div>
      </div>
    );
  }, []);

  const DefaultPageMemo = useMemo(() => {
    return (
      <div className={cx(pfx("page-presenting-div"), pfx("block-100"))}>
        {TopBar}
        <div className={pfx("block")}>
          {cloneElement(defaultPage, { id: activeId || id })}
        </div>
      </div>
    );
  }, [rerender, bubbleUp]);

  return (
    <>
      <div
        className={cx(defaultStyle(prefix, flexBasis), pfx("split-screen"))}
        ref={parentRef}
      >
        {!splitDirection && DefaultPageMemo}
        {splitDirection && (
          <div className={cx(pfx("blocks"), pfx(splitDirection + "-blocks"))}>
            <div className={cx(pfx("block-one"), pfx("block"))}>
              <InternalSplitScreen
                defaultPage={cloneElement(defaultPage, { id: id })}
                id={id + "-" + level}
                closeId={id + "b"}
                onClose={handleClosing}
                level={level + 1}
                rerenderFromRoot={bubbleRenderToRoot}
                bubbleUp={level === 0 ? lastBubbled : bubbleUp}
              />
            </div>
            <div className={cx(pfx("divider-container"))}>
              <div
                className={cx(pfx("divider"), pfx(splitDirection + "-divider"))}
              >
                <div
                  className={cx(pfx("divider-drag-div"))}
                  draggable
                  //onDragStart={dragHandler(splitDirection, "start")}
                  onDrag={dragHandler(splitDirection)}
                  onDragEnd={(event: DragEvent<HTMLDivElement>) => {
                    dragHandler(splitDirection)(event);
                    bubbleRenderToRoot();
                  }}
                ></div>
              </div>
            </div>
            <div className={cx(pfx("block-two"), pfx("block"))}>
              <InternalSplitScreen
                defaultPage={cloneElement(defaultPage, { id: id + "b" })}
                id={id + "-b-" + level}
                closeId={id}
                onClose={handleClosing}
                level={level + 1}
                prefix={prefix + "-" + level}
                rerenderFromRoot={bubbleRenderToRoot}
                bubbleUp={level === 0 ? lastBubbled : bubbleUp}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export type SplitScreenProps = {
  defaultPage?: ReactElement;
  prefix?: string;
};

export const SplitScreen: FC<SplitScreenProps> = ({
  defaultPage = <div>CONTENT</div>,
  prefix = "dv",
  ...props
}) => {
  return (
    <InternalSplitScreen
      prefix={prefix}
      defaultPage={defaultPage}
      id="splitScreenBaseId"
      onClose={(id: string) => {}}
    />
  );
};

export default SplitScreen;
