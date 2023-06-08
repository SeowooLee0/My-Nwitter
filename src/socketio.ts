import { io } from "socket.io-client";
import { createContext } from "react";

export const socket = io("https://my-nwitter.vercel.app", {
  transports: ["websocket"],
  withCredentials: true,
});
export const SocketContext = createContext(socket);

socket.on("connect", () => {
  console.log("socket server connected.");
});

socket.on("disconnect", () => {
  console.log("socket server disconnected.");
});

export const SOCKET_EVENT = {
  JOIN_ROOM: "JOIN_ROOM",
  SEND_MESSAGE: "SEND_MESSAGE",
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
  SEND_COMMENT: "SEND_COMMENT",
  RECEIVE_COMMENT: "RECEIVE_COMMENT",
  START_CHAT: "START_CHAT",
};

// export let socket: any = io("http://localhost:1234", {
//   transports: ["websocket"],
//   withCredentials: true,
// });
// export const initSocketConnection = () => {
//   if (socket) return;
//   socket.connect();
// };
