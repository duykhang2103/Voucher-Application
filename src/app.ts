import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./config/swagger";
import { ruruHTML } from "ruru/server";
import { createSchema, createYoga } from "graphql-yoga";
import { schema } from "./schema";
import corsMiddleware from "./middlewares/cors";
import { applyMiddleware } from "graphql-middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions))
);

const yoga = createYoga({
  schema: schema,
});

app.all("/graphql", yoga);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

export default app;
