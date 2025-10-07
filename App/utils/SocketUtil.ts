import socketio from 'socket.io-client-v4';
import { CurrentConfig } from "../../api_config"
const io = require('socket.io-client');
import socket_io from 'socket.io-client';

const socketWeb = CurrentConfig.old_socket_url.includes('wss') ? socketio.connect : io

export const socket = socketWeb(CurrentConfig.old_socket_url, {
  transports: ['websocket'],
  query: {
    pairStats: true,
    exchangeId: CurrentConfig.exchange_id,
  },
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  autoConnect: true,
})

export const tradingEngineSocket = socketio.connect(CurrentConfig.web_socket_url, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  withCredentials: true,
  auth: {
    token: CurrentConfig.socket_token
  }
});

export const socketIO = socket_io(CurrentConfig.web_socket_url, {
  reconnection: true,
  auth: {
    token: CurrentConfig.socket_token
  },
  transports: ['websocket']
});
