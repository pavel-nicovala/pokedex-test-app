import { PokemonSpecies, PokemonDetails } from "./types.js";

export const CUSTOM_POKEMON: Record<string, { species: PokemonSpecies; details: PokemonDetails }> = {
  mylahore: {
    species: {
      id: 10001,
      name: "mylahore",
      localised: [{ name: "Mylahore" }],
    },
    details: {
      height: 18,
      weight: 660,
      species: {
        id: 10001,
        name: "mylahore",
        is_baby: false,
        is_legendary: false,
        is_mythical: true,
        base_happiness: 100,
        capture_rate: 3,
        gender_rate: -1,
        has_gender_differences: false,
        forms_switchable: false,
        localised: [{ name: "Mylahore" }],
        evolution_chain: {
          evolutions: [
            { id: 10001, name: "mylahore", localised: [{ name: "Mylahore" }] },
          ],
        },
        flavor_text: [
          {
            id: 1,
            flavor_text:
              "A mythical Pokémon said to have emerged from the first lines of code ever written. " +
              "Its presence causes nearby software bugs to spontaneously resolve themselves.",
          },
        ],
      },
      types: [{ names: { name: "psychic" } }, { names: { name: "dragon" } }],
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
