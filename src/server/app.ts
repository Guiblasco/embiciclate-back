import express from "express";
import getPing from "./healthCheck/getPing.js";
import notFoundEndpoint from "./error/notFoundEndpoint/notFoundEndpoit.js";
import { generalError } from "./error/generalError/generalError.js";

const app = express();

app.disable("x-powered-by");

app.get("/", getPing);

app.use(notFoundEndpoint);
app.use(generalError);

export default app;
