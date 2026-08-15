import { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import {
  Server as SocketIOServer,
  Socket,
} from "socket.io";

import { env } from "../config/env";

interface JwtSocketPayload {
  id?: string;
  _id?: string;
  email?: string;
  role?: string;
}

interface AuthenticatedSocket extends Socket {
  data: {
    userId?: string;
    email?: string;
    role?: string;
    [key: string]: unknown;
  };
}

let io: SocketIOServer | null = null;

const getUserRoom = (userId: string) =>
  `user:${userId}`;

export const initializeSocket = (
  httpServer: HttpServer
): SocketIOServer => {
  if (io) {
    return io;
  }

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (
        typeof token !== "string" ||
        !token.trim()
      ) {
        return next(
          new Error("Authentication required")
        );
      }

      const decoded = jwt.verify(
        token,
        env.JWT_SECRET
      ) as JwtSocketPayload;

      const userId = decoded._id ?? decoded.id;

      if (!userId) {
        return next(
          new Error("Invalid token payload")
        );
      }

      const authenticatedSocket =
        socket as AuthenticatedSocket;

      authenticatedSocket.data.userId =
        String(userId);

      authenticatedSocket.data.email =
        decoded.email ?? "";

      authenticatedSocket.data.role =
        decoded.role ?? "";

      next();
    } catch {
      next(
        new Error("Invalid or expired token")
      );
    }
  });

  io.on(
    "connection",
    (socket) => {
      const authenticatedSocket =
        socket as AuthenticatedSocket;

      const userId =
        authenticatedSocket.data.userId;

      if (!userId) {
        socket.disconnect(true);
        return;
      }

      const userRoom = getUserRoom(userId);

      void socket.join(userRoom);

      console.log(
        `[Socket.IO] User connected: ${userId}`
      );

      console.log(
        `[Socket.IO] Joined room: ${userRoom}`
      );

      socket.on("disconnect", (reason) => {
        console.log(
          `[Socket.IO] User disconnected: ${userId} (${reason})`
        );
      });
    }
  );

  console.log(
    `[Socket.IO] Initialized on ${env.CLIENT_URL}`
  );

  return io;
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized"
    );
  }

  return io;
};

export const emitToUser = (
  userId: string,
  event: string,
  payload: unknown
): void => {
  if (!io) {
    console.warn(
      "[Socket.IO] Emit skipped - Socket.IO is not initialized"
    );

    return;
  }

  const room = getUserRoom(String(userId));

  io.to(room).emit(event, payload);

  console.log(
    `[Socket.IO] Event "${event}" emitted to ${room}`
  );
};

export const disconnectUserSockets = (
  userId: string
): void => {
  if (!io) {
    return;
  }

  const room = getUserRoom(String(userId));

  const sockets =
    io.sockets.adapter.rooms.get(room);

  if (!sockets) {
    return;
  }

  for (const socketId of sockets) {
    const socket = io.sockets.sockets.get(
      socketId
    );

    socket?.disconnect(true);
  }
};
