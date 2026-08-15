import { io, Socket } from "socket.io-client";

import { getAccessToken } from "@/lib/auth/tokens";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(
    /\/api\/?$/,
    ""
  ) ?? "http://localhost:5000";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    console.log(
      "[Socket.IO] Creating socket:",
      SOCKET_URL
    );

    socket = io(SOCKET_URL, {
      autoConnect: false,

      // Start with polling and allow Socket.IO
      // to upgrade to WebSocket automatically.
      transports: ["polling", "websocket"],

      upgrade: true,

      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,

      timeout: 10000,
    });

    socket.on("connect", () => {
      console.log(
        "[Socket.IO] CONNECTED:",
        socket?.id
      );
    });

    socket.on("connect_error", (error) => {
      console.error(
        "[Socket.IO] CONNECTION ERROR:",
        error.message
      );
    });

    socket.on("disconnect", (reason) => {
      console.log(
        "[Socket.IO] DISCONNECTED:",
        reason
      );
    });
  }

  return socket;
};

export const connectSocket = (): Socket | null => {
  const token = getAccessToken();

  if (!token) {
    console.warn(
      "[Socket.IO] No access token found."
    );

    return null;
  }

  const client = getSocket();

  client.auth = {
    token,
  };

  console.log(
    "[Socket.IO] Connecting with authenticated token..."
  );

  if (!client.connected) {
    client.connect();
  }

  return client;
};

export const disconnectSocket = (): void => {
  if (socket?.connected) {
    console.log(
      "[Socket.IO] Disconnecting..."
    );

    socket.disconnect();
  }
};