import express from "express";

import cors from "cors";

import helmet from "helmet";

import compression from "compression";

import cookieParser from "cookie-parser";

import morgan from "morgan";

import routes from "./routes";

import { env } from "./config/env";

import clientRoutes from "./modules/client/routes/Client.routes";

import { errorMiddleware } from "./middleware/error.middleware";
import taskRoutes from "../src/modules/task/routes/Task.routes";
import projectRoutes from "./modules/project/routes/Project.routes";
const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,

    credentials: true,
  })
);

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/clients", clientRoutes);

app.use(errorMiddleware);

export default app;