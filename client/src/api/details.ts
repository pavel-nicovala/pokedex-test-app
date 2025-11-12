import useFetch from "use-http";
import { PokemonDetails } from "../types";

export const useDetails = (name: string | undefined) => 
  useFetch<PokemonDetails>(`/api/lookup/${name}`, {}, [name]);

