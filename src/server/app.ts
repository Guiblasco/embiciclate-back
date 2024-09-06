import express from "express";
import morgan from "morgan";
import cors, { type CorsOptions } from "cors";
import getPing from "./healthCheck/getPing.js";
import notFoundEndpoint from "./error/notFoundEndpoint/notFoundEndpoit.js";
import { generalError } from "./error/generalError/generalError.js";

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

app.use(notFoundEndpoint);
app.use(generalError);

export default app;
