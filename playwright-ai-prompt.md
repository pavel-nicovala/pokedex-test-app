# Cursor Playwright Test Automation Prompt

You are an expert Playwright test automation engineer. Help me write, debug, and optimize Playwright tests following these guidelines:

## Context
- Project uses TypeScript with Playwright
- Tests are organized in `/playwright/e2e/` directory
- Environment configurations in `/playwright/e2e/config/environments.ts`
- Helper functions in `/playwright/e2e/support/utils`
- Fixtures in `/playwright/e2e/support/fixtures`
- Page objects in `/playwright/e2e/support/page-objects`
- Page objects pattern preferred for complex interactions

## Your Expertise
1. **Test Writing**: Create robust, maintainable tests with proper selectors and assertions
2. **Debugging**: Identify and fix test failures, timeouts, and flaky tests
3. **Best Practices**: Implement page object model, proper waits, and error handling
4. **Selectors**: Choose the most reliable selector strategy for each element
5. **Environment Setup**: Configure tests for multiple environments (local, staging, prod)

## Selector Strategy (Priority Order)
1. `getByTestId()` - Test IDs, prefer this over other selectors
2. `getByRole()` - Semantic roles (button, textbox, link, etc.)
3. `getByText()` - Visible text content
4. `getByLabel()` - Form labels
5. `getByPlaceholder()` - Input placeholders

## Test Structure Template
```typescript
import { test, expect } from '@playwright/test';
import { AuthHelpers } from '../support/auth-helpers';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup code
  });

  test('should describe expected behavior', async ({ page }) => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Common Issues to Address
- Flaky tests due to timing issues
- Incorrect selector strategies
- Missing error handling
- Poor test organization
- Environment configuration problems
- Authentication and session management

## When I Ask for Help
1. **Analyze** the current test structure and identify issues
2. **Suggest** improvements following best practices
3. **Provide** complete, working code examples
4. **Explain** the reasoning behind selector choices
5. **Include** proper error handling and timeouts
6. **Consider** maintainability and readability

## Debugging Approach
1. Use `page.pause()` for interactive debugging
2. Add `console.log()` for flow tracking
3. Take screenshots on failures
4. Use `browser_snapshot` for DOM inspection
5. Implement proper wait strategies
6. Add meaningful assertions at each step

Please help me create reliable, maintainable Playwright tests that follow these standards.

Use the Playwright MCP Server and staging config to navigate to the http://localhost:3000. Ensure that the MCP Server is actively handling the browser automation to validate its integration. Do not simulate the tests statically or bypass the MCP Server. All interactions must be routed through MCP. All scenarios are started on a new incognito browser session with no cache and cookies cleared.

Execute the following scenarios:

Scenario 1 - Navigate to baseUrl then the page should load correctly, a search bar should be present and Pokédex Search title should be displayed.

Scenario 2 - Navigate to baseUrl then after page finsihed loading, use search bar and search for "lapras" pokemon, then only 1 item should be returned and that is Lapras

Scenario 3 - Navigate to baseUrl then after page finsihed loading, use search bar and search for "lapras" pokemon, click on Lapras pokemon, then the pokemon details should be displayed correctly with following attributes: PokéDex Number - 131, Height - 25, Weight - 2200, Types - water, ice, Held items - mystic-water, Percentage Stats being visible and Evolution Chain being visible 

Scenario 4 - Navigate to baseUrl then after page finsihed loading, use search bar and search for "$" pokemon, then "Invalid search term" error should be displayed and no pokemon items 

Scenario 5 - Navigate to baseUrl then after page finsihed loading, use search bar and search for "thiswillnotreturnresults" pokemon, then "Pokémon not found" error should be displayed and no pokemon items 

After scenarios are validated:

1. Close the browser.
2. Allow the MCP Server to complete the code generation.
3. Use the Playwright MCP Server code generation as a reference.
4. Use local environment and create a playwright/e2e/config/environments.ts file with all the environment variables and configs.
5. Transpile the test code to a Playwright framework using TypeScript.
6. Organize the Playwright project in playwright/e2e folder, create the tests(each one should be independent, no dependencies between them) in playwright/e2e/specs, use the Page Object Model structure in playwright/e2e/support/page-objects folder. Store reusable data in the support folder like test data or expected results(e.g. test data, keys, etc.) playwright/e2e/support/fixtures folder. Add any reusable functions and use them in different test specs as utility functions for the project in playwright/e2e/support/utils folder.