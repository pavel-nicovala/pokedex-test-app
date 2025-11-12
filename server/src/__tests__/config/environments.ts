export interface TestEnvironmentConfig {
  apiBaseUrl: string;
  timeout: number;
  pokemonApiUrl: string;
}

const environments: Record<string, TestEnvironmentConfig> = {
  local: {
    apiBaseUrl: 'http://localhost:3001',
    timeout: 10000,
    pokemonApiUrl: 'https://beta.pokeapi.co/graphql/v1beta',
  },
  test: {
    apiBaseUrl: 'http://localhost:3001',
    timeout: 10000,
    pokemonApiUrl: 'https://beta.pokeapi.co/graphql/v1beta',
  },
  staging: {
    apiBaseUrl: 'http://localhost:3001',
    timeout: 15000,
    pokemonApiUrl: 'https://beta.pokeapi.co/graphql/v1beta',
  },
};

export function getTestEnvironmentConfig(): TestEnvironmentConfig {
  const env = process.env.TEST_ENV || process.env.NODE_ENV || 'test';
  return environments[env] || environments.test;
}

