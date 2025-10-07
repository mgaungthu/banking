import { useEffect, useState } from "react";
import { useIsMounted } from "./useIsMounted";
import { socketIO } from '../../utils/SocketUtil';
import { throttle } from 'lodash';
import { THROTTLE_TICKER } from "../../constants/Socket";

export const useTiker = (pair) => {

    const [ticker, setTicker] = useState<any>();
    const isMounted = useIsMounted();
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const throttledUpdate = throttle((tickerData) => {
            if (isMounted()) {
                const newTicker = JSON.parse(tickerData);
                setTicker(newTicker?.data);
            }
        }, THROTTLE_TICKER);

        if (pair) {
            socketIO.on(`today~${pair?.replace("-", "")}`, throttledUpdate);

            if (socketIO.connected) {
                socketIO.emit("message", {
                    id: 1,
                    jsonrpc: "2.0",
                    method: "today.subscribe",
                    params: {
                        market: pair?.replace("-", "")
                    }
                })
            }
        }
        else {
            setError("Not required parameter Pair")
        }

        return () => {
            socketIO.off(`today~${pair?.replace("-", "")}`);
            if (socketIO.connected) {
                socketIO.emit("message", {
                    id: 1,
                    jsonrpc: "2.0",
                    method: "today.unsubscribe",
                    params: {}
                })
            }
        };
    }, [pair, isMounted]);

    return [ticker, error];
}
