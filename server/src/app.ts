import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";

import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { apiRateLimiter } from "./middleware/rate-limiters/api.rate-limiter";

const app = express();

/**
 * =========================================================
 * PROXY
 * =========================================================
 */

app.set("trust proxy", 1);

/**
 * =========================================================
 * CORS
 * =========================================================
 */

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
    ],
  })
);

/**
 * =========================================================
 * SECURITY MIDDLEWARE
 * =========================================================
 */

app.use(helmet());

/**
 * =========================================================
 * PERFORMANCE
 * =========================================================
 */

app.use(compression());

/**
 * =========================================================
 * REQUEST LIMITS
 * =========================================================
 */

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

/**
 * =========================================================
 * COOKIES / LOGGING
 * =========================================================
 */

app.use(cookieParser());

app.use(morgan("dev"));

/**
 * =========================================================
 * GLOBAL API RATE LIMIT
 * =========================================================
 */

app.use("/api", apiRateLimiter);

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
