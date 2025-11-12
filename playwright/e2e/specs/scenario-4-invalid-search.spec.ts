import { test, expect } from '@playwright/test';
import { SearchPage } from '../support/page-objects/SearchPage';
import { clearBrowserState, waitForPageLoad } from '../support/utils/browser-helpers';
import { TestData } from '../support/fixtures/test-data';

test.describe('Scenario 4 - Invalid Search Term', () => {
  test('should display invalid search term error for special character', async ({ page }) => {
    // Arrange - Clear browser state for fresh session
    await clearBrowserState(page);
    
    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await waitForPageLoad(page);
    
    // Act - Search for invalid term "$"
    await searchPage.search(TestData.searchTerms.invalid);
    
    // Assert - Verify error message and no pokemon items
    await searchPage.verifyInvalidSearchTermError();
  });
});

