import { createServer } from "http";

import app from "./app";
import { connectDatabase } from "./config/db";
import { env } from "./config/env";
import { initializeSocket } from "./socket/socket";

async function bootstrap() {
  await connectDatabase();

  const httpServer = createServer(app);

  initializeSocket(httpServer);

  httpServer.listen(
    env.PORT,
    () => {
      console.log(
        `Server running on http://localhost:${env.PORT}`
      );

      console.log(
        `Socket.IO running on ws://localhost:${env.PORT}`
      );
    }
  );
}

bootstrap().catch((error) => {
  console.error(
    "Failed to start VYOMEX server:",
    error
  );

  process.exit(1);
});
