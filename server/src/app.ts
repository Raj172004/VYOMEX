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

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api", routes);

/*
|--------------------------------------------------------------------------
| Static Uploads
|--------------------------------------------------------------------------
*/

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

export default app;