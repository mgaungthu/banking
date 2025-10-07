import { useEffect, useRef, useState } from "react";
import { useIsMounted } from "./useIsMounted";
import { CurrentConfig } from "../../../api_config";
import io from 'socket.io-client';

export const useRecentTrade = (pair) => {

    const socket = useRef(io(CurrentConfig.web_socket_url, {
        reconnection: true,
        autoConnect: false,
        auth: {
            token: CurrentConfig.socket_token
        }
    }));

    const [recentTrades, setRecentTrades] = useState([]);
    const isMounted = useIsMounted();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();
    const [updated, setUpdated] = useState({});

    const update = () => setUpdated({});

    useEffect(() => {
        if (pair) {
            socket.current.on('connect', () => {
                if (isMounted()) {
                    socket.current.emit("message", {
                        id: 1,
                        jsonrpc: "2.0",
                        method: "deals.query",
                        params: {
                            market: pair?.replace("-", ""),
                            "offset": 0,
                            "limit": 10
                        }
                    });
                }
            });

            socket.current.on("disconnect", () => {
                if (isMounted()) {
                    setIsLoading(true);
                }
            });

            socket.current.on("connect_error", () => {
                if (isMounted()) {
                    setError("connect_error");
                }
            });

            socket.current.on("deals.query", (response: any) => {
                if (isMounted()) {
                    const trades = JSON.parse(response)
                    setRecentTrades(trades?.records || []);
                    socket.current.emit("message", {
                        id: 1,
                        jsonrpc: "2.0",
                        method: "deals.subscribe",
                        params: {
                            market: pair?.replace("-", ""),
                            "offset": 0,
                            "limit": 10
                        }
                    });
                    if (isLoading) setIsLoading(false);
                }
            });

            socket.current.on(`deals~${pair?.replace("-", "")}`, (trades) => {
                if (isMounted()) {
                    const newTrades = JSON.parse(trades);
                    setRecentTrades(newTrades?.data?.records || []);
                    if (isLoading) setIsLoading(false);
                }
            });


            socket.current.connect();
        }
        else {
            setIsLoading(false);
            setError("Not requered parameter Pair")
        }

        return () => {
            socket.current.removeAllListeners();
            socket.current.disconnect();
        }

    }, [updated])

    return [recentTrades, isLoading, error, update];

}