import express, { Router, Express } from "express";
import { lookupPokemon, searchPokemon } from "./queries.js";

const api = Router()
  .get("/search", searchPokemon)
  .get("/lookup/:name", lookupPokemon);

export const app: Express = express().use("/api", api);

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001;
  const server = app.listen(port, () => {
    const address = server.address();
    if (typeof address === 'string') {
      console.log("Backend server listening on", address);
    } else if (address) {
      console.log(`Backend server listening on http://${address.address}:${address.port}`);
    } else {
      console.log(`Backend server listening on port ${port}`);
    }
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use`);
    } else {
      console.error('Server error:', error);
    }
    process.exit(1);
  });
}

