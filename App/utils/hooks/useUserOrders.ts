import { useEffect, useRef, useState } from "react";
import { useIsMounted } from "./useIsMounted";
import { CurrentConfig } from "../../../api_config";
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { fundsList } from "../../store/action/quickbuy/QuickBuyAction";
import usePrevious from "./usePrevious";
import _ from "lodash"

export const useUserOrders = (pair) => {

    const { userProfileData } = useSelector((state: any) => state.appReducer);
    const userId = userProfileData?.uniqueId;
    const [userOrders, setUserOrders] = useState<any>();
    const prevUserOrders = usePrevious(userOrders);
    const dispatch = useDispatch()
    const isMounted = useIsMounted();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    const socket = useRef(io(CurrentConfig.web_socket_url, {
        reconnection: true,
        autoConnect: false,
        auth: {
            token: CurrentConfig.socket_token
        }
    }));

    useEffect(() => {
        if (!_.isEqual(prevUserOrders, userOrders)) {
            dispatch(fundsList())
        }
    }, [userOrders])

    useEffect(() => {
        if (userId && pair) {
            socket.current.on('connect', () => {
                if (isMounted()) {                    
                    socket.current.emit("message", {
                        id: 1,
                        jsonrpc: "2.0",
                        method: "order.query",
                        params: {
                            user_id: userId,
                            market: pair?.replace("-", ""),
                            offset: 0,
                            limit: 100
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

            socket.current.on("order.query", (res) => {
                if (isMounted()) {
                    const ordersBook = JSON.parse(res);
                    setUserOrders(ordersBook?.records);
                    socket.current.emit("message", {
                        id: 1,
                        jsonrpc: "2.0",
                        method: "order.subscribe",
                        params: {
                            user_id: userId,
                            market: pair?.replace("-", ""),
                            offset: 0,
                            limit: 100
                        }
                    });
                    if (isLoading) setIsLoading(false);
                }
            });

            socket.current.on(`order~${pair?.replace("-", "")}`, (res) => {
                if (isMounted()) {
                    const ordersBook = JSON.parse(res);
                    setUserOrders(ordersBook?.data?.records);
                    if (isLoading) setIsLoading(false);
                }
            });

            socket.current.connect();
        }
        else {
            setIsLoading(false);
            // setError("Not requered parameter Pair or UserId")
            setError("Error while fetching orders")
        }

        return () => {
            socket.current.removeAllListeners();
        }

    }, [])

    return [userOrders, isLoading, error]
}