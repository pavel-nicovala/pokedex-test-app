import { useFetch } from "use-http";
import { PokemonSpecies } from "../types";
import { API_BASE } from "./config";

export const useSearch = (query: string) =>
  useFetch<PokemonSpecies[]>(`${API_BASE}/api/search?${new URLSearchParams({ query })}`, {});

