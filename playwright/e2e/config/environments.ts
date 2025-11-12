export interface EnvironmentConfig {
  baseUrl: string;
  timeout: number;
}

const environments: Record<string, EnvironmentConfig> = {
  local: {
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
  },
  staging: {
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
  },
  production: {
    baseUrl: 'https://your-production-url.com',
    timeout: 30000,
  },
};

export function getEnvironmentConfig(): EnvironmentConfig {
  const env = process.env.PLAYWRIGHT_ENV || 'local';
  return environments[env] || environments.local;
}

