import app from "./app";

import { connectDatabase } from "./config/db";

import { env } from "./config/env";

async function bootstrap() {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(
      `Server running on http://localhost:${env.PORT}`
    );
  });
}

bootstrap();