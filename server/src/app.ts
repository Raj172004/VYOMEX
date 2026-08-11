import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";

import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

/**
 * =========================================================
 * CORS
 * =========================================================
 */

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
    ],
  })
);

/**
 * =========================================================
 * GLOBAL MIDDLEWARES
 * =========================================================
 */

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

/**
 * =========================================================
 * API ROUTES
 * =========================================================
 */

app.use("/api", routes);

/**
 * =========================================================
 * STATIC UPLOADS
 * =========================================================
 */

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

/**
 * =========================================================
 * GLOBAL ERROR HANDLER
 * =========================================================
 */

app.use(errorMiddleware);

export default app;