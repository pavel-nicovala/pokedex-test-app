import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly title: Locator;
  readonly searchInput: Locator;
  readonly searchLabel: Locator;
  readonly resultsList: Locator;
  readonly invalidTermError: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'Pokédex Search', level: 1 });
    this.searchLabel = page.getByText('Search:');
    this.searchInput = page.getByRole('textbox', { name: 'Search:' });
    this.resultsList = page.locator('ul.nes-container');
    this.invalidTermError = page.getByTestId('invalid-term-error');
    this.noResultsMessage = page.getByTestId('no-results-message');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchLabel).toBeVisible();
  }

  async verifySearchResults(expectedCount: number, expectedName?: string): Promise<void> {
    const results = this.page.locator('[data-test-id="result"]');
    await expect(results).toHaveCount(expectedCount);
    
    if (expectedName && expectedCount > 0) {
      await expect(this.page.getByRole('link', { name: new RegExp(expectedName, 'i') })).toBeVisible();
    }
  }

  async verifyInvalidSearchTermError(): Promise<void> {
    await expect(this.invalidTermError).toBeVisible();
    await expect(this.invalidTermError).toHaveText('Invalid search term');
    await expect(this.page.locator('[data-test-id="result"]')).toHaveCount(0);
  }

  async verifyNoResultsError(): Promise<void> {
    await expect(this.noResultsMessage).toBeVisible();
    await expect(this.noResultsMessage).toHaveText('No Pokémon found!');
    await expect(this.page.locator('[data-test-id="result"]')).toHaveCount(0);
  }

  async clickPokemonResult(pokemonName: string): Promise<void> {
    // The link may contain the pokemon name multiple times (sprite + text)
    // Using a regex that matches the pokemon name case-insensitively
    const link = this.page.getByRole('link', { name: new RegExp(pokemonName, 'i') });
    await link.click();
    await this.page.waitForURL(`**/pokemon/${pokemonName.toLowerCase()}`);
  }
}

