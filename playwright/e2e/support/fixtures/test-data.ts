export const TestData = {
  pokemon: {
    lapras: {
      name: 'lapras',
      displayName: 'Lapras',
      dexNumber: '131',
      height: '25',
      weight: '2200',
      types: 'water, ice',
      heldItems: 'mystic-water',
    },
    mylahore: {
      name: 'mylahore',
      displayName: 'Mylahore',
      dexNumber: '10001',
      height: '18',
      weight: '660',
      types: 'psychic, dragon',
    },
    gigel: {
      name: 'gigel',
      displayName: 'Gigel',
      dexNumber: '10002',
      height: '12',
      weight: '450',
      types: 'fire, fighting',
    },
  },
  searchTerms: {
    valid: 'lapras',
    invalid: '$',
    notFound: 'thiswillnotreturnresults',
    custom: 'mylahore',
    customPokemon: 'gigel',
  },
  errorMessages: {
    invalidSearchTerm: 'Invalid search term',
    pokemonNotFound: 'No Pokémon found!',
  },
  pageTitles: {
    search: 'Pokédex Search',
  },
} as const;
