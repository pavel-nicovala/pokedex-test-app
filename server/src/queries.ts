import { Request, Response } from "express";
import { gqlRoute } from "./pokeapi.js";
import { SearchQueryParams, LookupParams, PokemonSpecies, PokemonDetails } from "./types.js";
import { matchCustomPokemonSearch, lookupCustomPokemon } from "./custom-pokemon.js";

interface SearchData {
  species: PokemonSpecies[];
}

interface LookupData {
  pokemon: PokemonDetails[];
}

const searchPokemonBase = gqlRoute<SearchQueryParams, SearchData, PokemonSpecies[]>({
  query: `query searchPokemon($query: String!, $langId: Int!) {
    species: pokemon_v2_pokemonspecies(where: {name: {_ilike: $query}}) {
      id
      name
      localised: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: $langId}}) {
        name
      }
    }
  }`,
  variables: (req: Request) => ({
    query: (req.query.query as string) + "%",
    langId: req.query.langId ? parseInt(req.query.langId as string, 10) : 9,
  }),
  result: (data: SearchData) => data.species,
});

export const searchPokemon = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.query as string | undefined;
  if (!query || query.trim() === "") {
    res.status(400).json({ error: { message: "Invalid query parameter" } });
    return;
  }
  const custom = matchCustomPokemonSearch(query);

  // Capture the base handler's response to merge in custom results
  let baseStatus = 200;
  let baseBody: PokemonSpecies[] = [];
  const fakeRes = {
    status(code: number) { baseStatus = code; return fakeRes; },
    json(body: unknown) { baseBody = body as PokemonSpecies[]; return fakeRes; },
  } as unknown as Response;

  await searchPokemonBase(req, fakeRes);

  if (baseStatus !== 200) {
    res.status(baseStatus).json(baseBody);
    return;
  }
  res.status(200).json([...baseBody, ...custom]);
};

const lookupPokemonBase = gqlRoute<LookupParams, LookupData, PokemonDetails>({
  query: `query lookupPokemon($name: String!) {
    pokemon: pokemon_v2_pokemon(where: {name: {_eq: $name}}) {
      height
      weight
      species: pokemon_v2_pokemonspecy {
        id
        name
        is_baby
        is_legendary
        is_mythical
        base_happiness
        capture_rate
        gender_rate
        has_gender_differences
        forms_switchable
        localised: pokemon_v2_pokemonspeciesnames(where:{ language_id: {_eq: 9 }}) {
          name
        }
        evolution_chain: pokemon_v2_evolutionchain {
          evolutions: pokemon_v2_pokemonspecies {
            id
            name
            localised: pokemon_v2_pokemonspeciesnames(where:{ language_id: {_eq: 9 }}) {
              name
            }
          }
        }
        flavor_text: pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}, limit: 1) {
          flavor_text
          id
        }
      }

      types: pokemon_v2_pokemontypes{
        names: pokemon_v2_type {
          name
        }
      }
      items: pokemon_v2_pokemonitems(distinct_on: item_id) {
        item: pokemon_v2_item  {
          name
        }
      }
    }
  }`,
  variables: (req: Request) => ({ name: req.params.name } as LookupParams),
  result: (data: LookupData) => data.pokemon[0] ?? ({} as PokemonDetails),
});

export const lookupPokemon = async (req: Request, res: Response): Promise<void> => {
  const custom = lookupCustomPokemon(req.params.name);
  if (custom) {
    res.status(200).json(custom);
    return;
  }
  await lookupPokemonBase(req, res);
};

