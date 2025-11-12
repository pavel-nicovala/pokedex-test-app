import { useFetch } from "use-http";
import { PokemonSpecies } from "../types";

export const useSearch = (query: string) =>
  useFetch<PokemonSpecies[]>(`/api/search?${new URLSearchParams({ query })}`, {});

