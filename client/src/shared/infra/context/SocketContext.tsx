import React, { createContext } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";
interface SocketContextProps {
  children: React.ReactNode;
}
interface ISocketContext {
  socket: Socket;
  online: boolean;
}
export const SocketContext = createContext({} as ISocketContext);

export const SocketProvider = ({ children }: SocketContextProps) => {
  const { socket, online } = useSocket("http://localhost:4000");

  return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
