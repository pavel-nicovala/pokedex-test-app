import { useFetch } from "use-http";
import { PokemonSpecies } from "../types";
import { API_BASE } from "./config";

// Results may include custom (non-PokéAPI) entries with id >= 10001 appended after standard results.
export const useSearch = (query: string) =>
  useFetch<PokemonSpecies[]>(`${API_BASE}/api/search?${new URLSearchParams({ query })}`, {});

