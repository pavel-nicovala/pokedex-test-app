import express, { Router } from "express";
import { lookupPokemon, searchPokemon } from "./queries.js";

const api = Router()
  .get("/search", searchPokemon)
  .get("/lookup/:name", lookupPokemon);

const server = express()
  .use("/api", api)
  .listen(process.env.PORT || 3001, () => {
    const address = server.address();
    console.log("Backend server listening on", address);
  });

