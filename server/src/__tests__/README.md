# API Tests

This directory contains API tests for the Pokédex API using Supertest and Vitest.

## Structure

```
__tests__/
├── config/
│   └── environments.ts      # Environment configurations for tests
├── helpers/
│   └── test-helper.ts      # Test utilities and helpers
└── api/
    ├── search.test.ts      # Tests for GET /api/search
    └── lookup.test.ts       # Tests for GET /api/lookup/{name}
```

## Running Tests

Run all API tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run specific test file:
```bash
npx vitest run src/__tests__/api/search.test.ts
```

## Test Coverage

### GET /api/search
- ✅ Successful searches with valid pokemon names
- ✅ Partial name matching
- ✅ Case-insensitive searches
- ✅ Default and custom langId parameters
- ✅ Empty results handling
- ✅ Error handling (missing/empty query)
- ✅ Response structure validation

### GET /api/lookup/{name}
- ✅ Successful lookups for valid pokemon
- ✅ Detailed structure validation (lapras example)
- ✅ Species details validation
- ✅ Evolution chain handling
- ✅ Flavor text handling
- ✅ Empty object for non-existent pokemon
- ✅ Error handling
- ✅ Response structure validation
- ✅ Type and item validation

## Environment Configuration

Tests use environment configuration from `config/environments.ts`. Set the `TEST_ENV` environment variable to switch environments:

```bash
TEST_ENV=staging npm test
```

Available environments:
- `test` (default)
- `local`
- `staging`

## Test Framework

- **Vitest**: Fast test runner with ES modules support
- **Supertest**: HTTP assertion library for testing Express apps
- **TypeScript**: Full type safety

## Notes

- Tests run with `NODE_ENV=test` to prevent the server from starting automatically
- The Express app is exported from `src/index.ts` for testing
- All tests are independent and can run in parallel

