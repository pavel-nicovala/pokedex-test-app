import express, { Router } from "express";
import { lookupPokemon, searchPokemon } from "./queries.mjs";

const api = new Router()
  .get("/search", searchPokemon)
  .get("/lookup/:name", lookupPokemon);

const server = express()
  .use("/api", api)
  .listen(process.env.PORT || 3001, () => {
    console.log("Backend server listening on", server.address());
  });
