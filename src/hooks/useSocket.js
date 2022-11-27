import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000", { transports: ["websocket"] });

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState({
    data: "",
    userCount: 0,
  });
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("message", (data) => {
      setLastMessage((pre) => ({ ...pre, ...data }));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.disconnect();
    };
  }, []);

  const sendPing = (data) => socket.emit("message", data);

  return { isConnected, lastMessage, sendPing };
};
