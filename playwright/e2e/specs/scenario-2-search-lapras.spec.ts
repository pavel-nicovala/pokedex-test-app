import { test, expect } from '@playwright/test';
import { SearchPage } from '../support/page-objects/SearchPage';
import { clearBrowserState, waitForPageLoad } from '../support/utils/browser-helpers';
import { TestData } from '../support/fixtures/test-data';

test.describe('Scenario 2 - Search for Lapras', () => {
  test('should return only 1 result for lapras search', async ({ page }) => {
    // Arrange - Clear browser state for fresh session
    await clearBrowserState(page);
    
    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await waitForPageLoad(page);
    
    // Act - Search for lapras
    await searchPage.search(TestData.searchTerms.valid);
    
    // Assert - Verify only 1 item returned and it is Lapras
    await searchPage.verifySearchResults(1, TestData.pokemon.lapras.displayName);
  });
});

