import express, { Router, Express } from "express";
import { lookupPokemon, searchPokemon } from "./queries.js";

const api = Router()
  .get("/search", searchPokemon)
  .get("/lookup/:name", lookupPokemon);

export const app: Express = express().use("/api", api);

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(process.env.PORT || 3001, () => {
    const address = server.address();
    console.log("Backend server listening on", address);
  });
}

