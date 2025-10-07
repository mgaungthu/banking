import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {MapperConstants} from '../../constants'
import { tradingEngineSocket } from '../../utils/SocketUtil'
import SocketConstants from '../../constants/SocketConstants'
import {TickerActions} from '../../store'
import { createRpcRequest } from '../../utils/AppFunctions'
import {socket} from '../../utils/SocketUtil'
import { GET_TICKERS_SUCCESSFULL } from '../../store/constants/ReduxConstants'
import _ from "lodash"
import { THROTTLE_TICKER } from '../../constants/Socket'



const SocketWrapper = () => {
  const dispatch = useDispatch()
  const globalData = useSelector((state: any) => state.globalReducer)

  const handleTickerUpdate = _.throttle((data:any) => {    
    dispatch(TickerActions.updateTickers(data))
    dispatch({type:GET_TICKERS_SUCCESSFULL, payload:data})
  }, THROTTLE_TICKER)

  useEffect(() => {
      socket.on('connect', () => {
        
      })
      socket.on('disconnect', (res) => {
        socket.connect()
        // console.log("disconnect",res);
      })
      socket.on('connect_error', err => {
        // console.log('connect_error',err.message)
      })
      socket.on('error', err => {
        // console.log('error',err.message)
      })
      tradingEngineSocket.send(createRpcRequest('summary.query', {}));
      tradingEngineSocket.send(createRpcRequest('summary.subscribe', {}));

      tradingEngineSocket.on("summary.query", (data) => {
        const tickers = JSON.parse(data||"[]")
        handleTickerUpdate(tickers)
      });

      tradingEngineSocket.on("summary", (data) => {
        const tickers = JSON.parse(data)?.data||[]        
        handleTickerUpdate(tickers)
      });
      // console.log('socket details',socket)
      if (socket.connect) {
        socket.emit(SocketConstants.Join, {pairStats: true}, response => {
          // console.log('emit acknowledgement',response)
        })


        socket.on(SocketConstants.PairStatus, data => {          // Get Pair status list
          if (data && data?.length) {
            const favouriteTickers = globalData.userdata? globalData?.favouriteTickers:[]
            if (favouriteTickers && favouriteTickers?.length > 0) {
              data.map((res: any) => {
                let existedData = favouriteTickers?.find(
                  resp => resp.id === res.id,
                )
                res.isFavourite =
                  existedData && Object.keys(existedData)?.length > 0
                    ? MapperConstants.StatusMapper.enable
                    : MapperConstants.StatusMapper.disable
              })
              dispatch(TickerActions.updateTickers(data))
            } else {
              dispatch(TickerActions.updateTickers(data))
            }
          }
        })
      }
    
  }, [globalData.internetAvailable])

  return <></>
}

export default SocketWrapper
