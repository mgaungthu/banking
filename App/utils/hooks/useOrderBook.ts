import { useEffect, useRef, useState } from "react";
import { useIsMounted } from "./useIsMounted";
import { CurrentConfig } from "../../../api_config";
import io from 'socket.io-client';

export const useOrderBook = (pair) => {
    const [orderBook, setOrderBook] = useState<any>();
    const isMounted = useIsMounted();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();
    const [updated, setUpdated] = useState({});

    const socket = useRef(io(CurrentConfig.web_socket_url, {
        reconnection: true,
        autoConnect: false,
        auth: {
            token: CurrentConfig.socket_token
        }
    }));

    const update = () => setUpdated({});

    useEffect(() => {
        if (pair) {
            socket.current.on('connect', () => {
                if (isMounted()) {
                    socket.current.emit("message", {
                        id: 1,
                        jsonrpc: "2.0",
                        method: "book.query",
                        params: {
                            market: pair?.replace("-", ""),
                            offset: 0,
                            limit: 20
                        }
                    });
                }
            });

            socket.current.on("disconnect", (reason) => {
                if (isMounted()) {
                    setIsLoading(true);
                }
            });

            socket.current.on("connect_error", (error) => {
                if (isMounted()) {
                    setError("connect_error");
                }
            });

            socket.current.on("book.query", (res) => {
                if (isMounted()) {
                                        
                    const ordersBook = JSON.parse(res);
                    setOrderBook(ordersBook?.records);
                    socket.current.emit("message", {
                        id: 1,
                        jsonrpc: "2.0",
                        method: "book.subscribe",
                        params: {
                            market: pair?.replace("-", ""),
                            offset: 0,
                            limit: 20
                        }
                    });
                    if (isLoading) setIsLoading(false);
                }
            });

            socket.current.on(`book~${pair?.replace("-", "")}`, (res) => {
                if (isMounted()) {
                    const ordersBook = JSON.parse(res);
                    setOrderBook(ordersBook?.data?.records);
                    if (isLoading) setIsLoading(false);
                }
            });

            socket.current.connect();
        }
        else {
            setIsLoading(false);
            setError("Not required parameter Pair")
        }

        return () => {
            socket.current.removeAllListeners();
            socket.current.disconnect();
        };
    }, [updated]);

    return [orderBook, isLoading, error, update];
};