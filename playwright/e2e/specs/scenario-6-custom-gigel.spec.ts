import { test, expect } from '@playwright/test';
import { SearchPage } from '../support/page-objects/SearchPage';
import { DetailPage } from '../support/page-objects/DetailPage';
import { clearBrowserState, waitForPageLoad } from '../support/utils/browser-helpers';
import { TestData } from '../support/fixtures/test-data';

test.describe('Scenario 6 - Custom Pokémon Gigel', () => {
  test('should display gigel in search results with a custom badge', async ({ page }) => {
    await clearBrowserState(page);

    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await waitForPageLoad(page);

    await searchPage.search(TestData.searchTerms.customPokemon);

    // Gigel should appear in results
    await searchPage.verifySearchResults(1, TestData.pokemon.gigel.displayName);

    // Custom badge (★) should be visible for gigel
    const badge = page.getByTestId('custom-badge');
    await expect(badge).toBeVisible();
  });

  test('should navigate to gigel detail page and show correct information', async ({ page }) => {
    await clearBrowserState(page);

    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await waitForPageLoad(page);

    await searchPage.search(TestData.searchTerms.customPokemon);
    await searchPage.clickPokemonResult(TestData.pokemon.gigel.name);

    const detailPage = new DetailPage(page);

    await expect(detailPage.pokemonName).toBeVisible();
    await expect(detailPage.physicalStatsSection).toBeVisible();

    await detailPage.verifyPokemonDetails({
      dexNumber: TestData.pokemon.gigel.dexNumber,
      height: TestData.pokemon.gigel.height,
      weight: TestData.pokemon.gigel.weight,
      types: TestData.pokemon.gigel.types,
      heldItems: TestData.pokemon.gigel.heldItems,
    });
  });

  test('should show evolution chain on gigel detail page', async ({ page }) => {
    await clearBrowserState(page);
    await page.goto('/pokemon/gigel');
    await waitForPageLoad(page);

    const detailPage = new DetailPage(page);
    await detailPage.verifyEvolutionChainVisible();

    // Evolution chain should contain gigel itself (solo evolution)
    await expect(
      page.getByRole('link', { name: /Gigel/i })
    ).toBeVisible();
  });
});
