import { test, expect } from '@playwright/test';
import { SearchPage } from '../support/page-objects/SearchPage';
import { clearBrowserState, waitForPageLoad } from '../support/utils/browser-helpers';
import { TestData } from '../support/fixtures/test-data';

test.describe('Scenario 5 - Pokemon Not Found', () => {
  test('should display not found error for non-existent pokemon', async ({ page }) => {
    // Arrange - Clear browser state for fresh session
    await clearBrowserState(page);
    
    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await waitForPageLoad(page);
    
    // Act - Search for pokemon that does not exist
    await searchPage.search(TestData.searchTerms.notFound);
    
    // Assert - Verify error message and no pokemon items
    await searchPage.verifyNoResultsError();
  });
});

