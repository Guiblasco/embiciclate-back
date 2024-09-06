import express from "express";
import getPing from "./healthCheck/getPing.js";

const app = express();

app.disable("x-powered-by");

app.get("/", getPing);

export default app;
