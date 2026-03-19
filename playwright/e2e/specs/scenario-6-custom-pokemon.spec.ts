import { test, expect } from '@playwright/test';
import { SearchPage } from '../support/page-objects/SearchPage';
import { DetailPage } from '../support/page-objects/DetailPage';
import { clearBrowserState, waitForPageLoad } from '../support/utils/browser-helpers';
import { TestData } from '../support/fixtures/test-data';

test.describe('Scenario 6 - Custom Pokémon (mylahore)', () => {
  test('should appear in search results', async ({ page }) => {
    await clearBrowserState(page);

    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await waitForPageLoad(page);

    await searchPage.search(TestData.searchTerms.custom);

    await searchPage.verifySearchResults(1, TestData.pokemon.mylahore.displayName);
  });

  test('should display correct details on the detail page', async ({ page }) => {
    await clearBrowserState(page);

    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await waitForPageLoad(page);

    await searchPage.search(TestData.searchTerms.custom);
    await searchPage.clickPokemonResult(TestData.pokemon.mylahore.name);
    await waitForPageLoad(page);

    const detailPage = new DetailPage(page);
    await detailPage.verifyPokemonDetails({
      dexNumber: TestData.pokemon.mylahore.dexNumber,
      height: TestData.pokemon.mylahore.height,
      weight: TestData.pokemon.mylahore.weight,
      types: TestData.pokemon.mylahore.types,
      heldItems: '',
    });
    await detailPage.verifyPercentageStatsVisible();
    await detailPage.verifyEvolutionChainVisible();
  });
});
