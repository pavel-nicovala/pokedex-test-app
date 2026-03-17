import useFetch from "use-http";
import { PokemonDetails } from "../types";
import { API_BASE } from "./config";

export const useDetails = (name: string | undefined) =>
  useFetch<PokemonDetails>(`${API_BASE}/api/lookup/${name}`, {}, [name]);

