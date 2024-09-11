import express from "express";
import morgan from "morgan";
import cors, { type CorsOptions } from "cors";
import getPing from "./healthCheck/getPing.js";
import { generalError } from "./error/generalError/generalError.js";
import notFoundError from "./error/notFoundError/notFoundError.js";
import bikesRouter from "../bike/router/bikesRouter.js";

const app = express();

const origins: CorsOptions = {
  origin: [
    "http://localhost:3000",
    "https://guillem-blasco-202406-front.netlify.app",
  ],
};

app.disable("x-powered-by");

app.use(cors(origins));

app.use(morgan("dev"));

app.get("/", getPing);

app.use("/bikes", bikesRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
