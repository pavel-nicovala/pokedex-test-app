import { PokemonSpecies, PokemonDetails } from "./types.js";

export const CUSTOM_POKEMON_ID_START = 10001;

export const CUSTOM_POKEMON: Record<string, { species: PokemonSpecies; details: PokemonDetails }> = {
  gigel: {
    species: {
      id: CUSTOM_POKEMON_ID_START,
      name: "gigel",
      localised: [{ name: "Gigel" }],
    },
    details: {
      height: 12,
      weight: 450,
      species: {
        id: CUSTOM_POKEMON_ID_START,
        name: "gigel",
        is_baby: false,
        is_legendary: true,
        is_mythical: false,
        base_happiness: 70,
        capture_rate: 3,
        gender_rate: -1,
        has_gender_differences: false,
        forms_switchable: false,
        localised: [{ name: "Gigel" }],
        evolution_chain: {
          evolutions: [
            { id: CUSTOM_POKEMON_ID_START, name: "gigel", localised: [{ name: "Gigel" }] },
          ],
        },
        flavor_text: [
          {
            id: 1,
            flavor_text:
              "A legendary Pokémon forged from the heat of a thousand servers. " +
              "Said to appear only when a deadline approaches.",
          },
        ],
      },
      types: [{ names: { name: "fire" } }, { names: { name: "fighting" } }],
      items: [],
    },
  },
};

export function matchCustomPokemonSearch(query: string): PokemonSpecies[] {
  const q = query.toLowerCase();
  if (!q) return [];
  return Object.values(CUSTOM_POKEMON)
    .filter(({ species }) => species.name.startsWith(q))
    .map(({ species }) => species);
}

export function lookupCustomPokemon(name: string): PokemonDetails | null {
  return CUSTOM_POKEMON[name.toLowerCase()]?.details ?? null;
}
