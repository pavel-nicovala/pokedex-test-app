import { test, expect } from '@playwright/test';
import { SearchPage } from '../support/page-objects/SearchPage';
import { DetailPage } from '../support/page-objects/DetailPage';
import { clearBrowserState, waitForPageLoad } from '../support/utils/browser-helpers';
import { TestData } from '../support/fixtures/test-data';

test.describe('Scenario 3 - Lapras Details', () => {
  test('should display correct pokemon details after clicking Lapras', async ({ page }) => {
    // Arrange - Clear browser state for fresh session
    await clearBrowserState(page);
    
    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await waitForPageLoad(page);
    
    // Act - Search for lapras and click on it
    await searchPage.search(TestData.searchTerms.valid);
    await searchPage.clickPokemonResult(TestData.pokemon.lapras.name);
    await waitForPageLoad(page);
    
    // Assert - Verify all details are displayed correctly
    const detailPage = new DetailPage(page);
    await detailPage.verifyPokemonDetails({
      dexNumber: TestData.pokemon.lapras.dexNumber,
      height: TestData.pokemon.lapras.height,
      weight: TestData.pokemon.lapras.weight,
      types: TestData.pokemon.lapras.types,
      heldItems: TestData.pokemon.lapras.heldItems,
    });
    await detailPage.verifyPercentageStatsVisible();
    await detailPage.verifyEvolutionChainVisible();
  });
});

