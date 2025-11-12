import { test, expect } from '@playwright/test';
import { SearchPage } from '../support/page-objects/SearchPage';
import { clearBrowserState, waitForPageLoad } from '../support/utils/browser-helpers';

test.describe('Scenario 1 - Page Load', () => {
  test('should load page correctly with search bar and Pokédex Search title', async ({ page }) => {
    // Arrange - Clear browser state for fresh session
    await clearBrowserState(page);
    
    // Act - Navigate to base URL
    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await waitForPageLoad(page);
    
    // Assert - Verify page elements are present
    await searchPage.verifyPageLoaded();
    await expect(page).toHaveTitle(/React App/);
  });
});

