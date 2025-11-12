# Playwright Test Suite

This directory contains the Playwright end-to-end test suite for the Pokédex application.

## Structure

```
playwright/
├── e2e/
│   ├── config/
│   │   └── environments.ts      # Environment configurations
│   ├── specs/                   # Test specifications
│   │   ├── scenario-1-page-load.spec.ts
│   │   ├── scenario-2-search-lapras.spec.ts
│   │   ├── scenario-3-lapras-details.spec.ts
│   │   ├── scenario-4-invalid-search.spec.ts
│   │   └── scenario-5-not-found.spec.ts
│   └── support/
│       ├── fixtures/
│       │   └── test-data.ts     # Test data and constants
│       ├── page-objects/        # Page Object Model classes
│       │   ├── SearchPage.ts
│       │   └── DetailPage.ts
│       └── utils/
│           └── browser-helpers.ts  # Utility functions
└── tsconfig.json                # TypeScript configuration
```

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npm run test:playwright
```

Run tests in UI mode:

```bash
npm run test:playwright:ui
```

Run tests in headed mode (visible browser):

```bash
npm run test:playwright:headed
```

Run tests in debug mode:

```bash
npm run test:playwright:debug
```

Run a specific test file:

```bash
npx playwright test playwright/e2e/specs/scenario-1-page-load.spec.ts
```

## Test Scenarios

1. **Scenario 1**: Page Load - Verifies the search page loads correctly with title and search bar
2. **Scenario 2**: Search for Lapras - Verifies search returns exactly 1 result for "lapras"
3. **Scenario 3**: Lapras Details - Verifies all pokemon details are displayed correctly
4. **Scenario 4**: Invalid Search - Verifies error message for invalid search term "$"
5. **Scenario 5**: Not Found - Verifies error message for non-existent pokemon

## Environment Configuration

Tests use the environment configuration from `playwright/e2e/config/environments.ts`. Set the `PLAYWRIGHT_ENV` environment variable to switch environments:

```bash
PLAYWRIGHT_ENV=staging npm run test:playwright
```

## Page Object Model

The tests use the Page Object Model pattern for maintainability:

- **SearchPage**: Handles all interactions with the search page
- **DetailPage**: Handles all interactions with the pokemon detail page

## Test Data

Test data and expected values are stored in `playwright/e2e/support/fixtures/test-data.ts` for easy maintenance.

## Best Practices

- Each test is independent with no dependencies between scenarios
- Tests start with a fresh browser session (cache and cookies cleared)
- Tests use semantic selectors (getByRole, getByTestId) for reliability
- Page Object Model pattern for reusability and maintainability

