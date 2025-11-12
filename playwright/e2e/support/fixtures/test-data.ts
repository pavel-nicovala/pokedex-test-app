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
  },
  searchTerms: {
    valid: 'lapras',
    invalid: '$',
    notFound: 'thiswillnotreturnresults',
  },
  errorMessages: {
    invalidSearchTerm: 'Invalid search term',
    pokemonNotFound: 'No Pokémon found!',
  },
  pageTitles: {
    search: 'Pokédex Search',
  },
} as const;

