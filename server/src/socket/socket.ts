import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

import { env } from "../config/env";

interface JwtPayload {
  id?: string;
  _id?: string;
  email?: string;
  role: string;
}

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

let io: SocketIOServer | null = null;

export const initializeSocket = (
  httpServer: HttpServer
): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ??
        socket.handshake.headers.authorization?.replace(
          "Bearer ",
          ""
        );

      if (!token) {
        return next(
          new Error("Authentication required")
        );
      }

      const decoded = jwt.verify(
        token,
        env.JWT_SECRET
      ) as JwtPayload;

      const userId = decoded._id ?? decoded.id;

      if (
        !userId ||
        !Types.ObjectId.isValid(userId)
      ) {
        return next(
          new Error("Invalid authentication token")
        );
      }

      const authenticatedSocket =
        socket as AuthenticatedSocket;

      authenticatedSocket.userId = userId;
      authenticatedSocket.userRole = decoded.role;

      next();
    } catch {
      next(
        new Error("Invalid or expired token")
      );
    }
  });

  io.on(
    "connection",
    (socket: AuthenticatedSocket) => {
      if (!socket.userId) {
        socket.disconnect(true);
        return;
      }

      const userRoom = `user:${socket.userId}`;

      socket.join(userRoom);

      console.log(
        `[Socket.IO] User connected: ${socket.userId}`
      );

      console.log(
        `[Socket.IO] Joined room: ${userRoom}`
      );

      socket.on("disconnect", (reason) => {
        console.log(
          `[Socket.IO] User disconnected: ${socket.userId} (${reason})`
        );
      });
    }
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
  getIO()
    .to(`user:${userId}`)
    .emit(event, payload);
};
