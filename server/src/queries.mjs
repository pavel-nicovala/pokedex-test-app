import { gqlRoute } from "./pokeapi.mjs";

export const searchPokemon = gqlRoute({
  query: `query searchPokemon($query: String!, $langId: Int!) {
    species: pokemon_v2_pokemonspecies(where: {name: {_ilike: $query}}) {
      id
      name
      localised: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: $langId}}) {
        name
      }
    }
  }`,
  variables: (req) => ({
    query: req.query.query + "%",
    langId: req.query.langId ?? 9,
  }),
  result: (data) => data.species,
});

export const lookupPokemon = gqlRoute({
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
  variables: (req) => req.params,
  result: (data) => data.pokemon[0] ?? {},
});
