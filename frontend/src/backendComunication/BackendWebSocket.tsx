import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { sensorWarningsAtom } from "../atoms/registered-alarms-atoms";

export const BackendWebSocket = () => {
  const setAlarms = useSetRecoilState(sensorWarningsAtom);

  useEffect(() => {
    console.log(
      "=======================CREATING WEBSOCKET======================="
    );
    const ws = new WebSocket("ws://localhost:3003/alert");
    ws.onopen = (event) => {
      console.log("OPEN WEBSOCKET BACKEND", event);
    };
    ws.onmessage = (event) => {
      console.log("received message");
      console.log(event);
      try {
        setAlarms((current) => [...current, JSON.parse(event.data)]);
      } catch (err) {
        console.log(err);
      }
    };
    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,
          event
        );
      } else {
        console.log("[close] Connection died", event);
      }
    };
    ws.onerror = (error) => {
      console.log(`[ERROR]`, error);
    };
    //clean up function
    return () => {
      console.log("Closing conection");
      ws.close();
    };
  }, [setAlarms]);

  return <></>;
};

export default BackendWebSocket;
