export interface PokemonSpecies {
  id: number;
  name: string;
  localised: Array<{
    name: string;
  }>;
}

export const CUSTOM_POKEMON_ID_START = 10001;

/** Returns true for custom (non-PokéAPI) entries injected by the server (id >= CUSTOM_POKEMON_ID_START). */
export const isCustomPokemon = (species: PokemonSpecies): boolean =>
  species.id >= CUSTOM_POKEMON_ID_START;

export interface PokemonType {
  names: {
    name: string;
  };
}

export interface PokemonItem {
  item: {
    name: string;
  };
}

export interface PokemonEvolution {
  id: number;
  name: string;
  localised: Array<{
    name: string;
  }>;
}

export interface PokemonSpeciesDetails {
  id: number;
  name: string;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  base_happiness: number;
  capture_rate: number;
  gender_rate: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  localised: Array<{
    name: string;
  }>;
  evolution_chain?: {
    evolutions: PokemonEvolution[];
  };
  flavor_text?: Array<{
    id: number;
    flavor_text: string;
  }>;
}

export interface PokemonDetails {
  height: number;
  weight: number;
  species: PokemonSpeciesDetails;
  types: PokemonType[];
  items: PokemonItem[];
}

