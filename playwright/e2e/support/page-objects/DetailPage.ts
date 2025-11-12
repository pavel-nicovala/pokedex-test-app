import { Page, Locator, expect } from '@playwright/test';

export class DetailPage {
  readonly page: Page;
  readonly pokemonName: Locator;
  readonly backButton: Locator;
  readonly physicalStatsSection: Locator;
  readonly percentageStatsSection: Locator;
  readonly evolutionChainSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pokemonName = page.getByRole('heading', { level: 1 });
    this.backButton = page.getByRole('link', { name: '< Back' });
    this.physicalStatsSection = page.getByRole('heading', { name: 'Physical Stats', level: 2 });
    this.percentageStatsSection = page.getByRole('heading', { name: 'Percentage Stats', level: 2 });
    this.evolutionChainSection = page.getByRole('heading', { name: 'Evolution Chain', level: 2 });
  }

  async verifyPokemonDetails(details: {
    dexNumber: string;
    height: string;
    weight: string;
    types: string;
    heldItems: string;
  }): Promise<void> {
    // Verify PokéDex Number
    await expect(
      this.page.getByRole('row', { name: new RegExp(`PokéDex Number.*${details.dexNumber}`) })
    ).toBeVisible();

    // Verify Height
    await expect(
      this.page.getByRole('row', { name: new RegExp(`Height.*${details.height}`) })
    ).toBeVisible();

    // Verify Weight
    await expect(
      this.page.getByRole('row', { name: new RegExp(`Weight.*${details.weight}`) })
    ).toBeVisible();

    // Verify Types
    await expect(
      this.page.getByRole('row', { name: new RegExp(`Types.*${details.types}`) })
    ).toBeVisible();

    // Verify Held Items
    await expect(
      this.page.getByRole('row', { name: new RegExp(`Held Items.*${details.heldItems}`) })
    ).toBeVisible();
  }

  async verifyPercentageStatsVisible(): Promise<void> {
    await expect(this.percentageStatsSection).toBeVisible();
    // Verify progress bars are present
    await expect(this.page.locator('progress#base_happiness')).toBeVisible();
    await expect(this.page.locator('progress#capture_rate')).toBeVisible();
    await expect(this.page.locator('progress#gender_rate')).toBeVisible();
  }

  async verifyEvolutionChainVisible(): Promise<void> {
    await expect(this.evolutionChainSection).toBeVisible();
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
    await this.page.waitForURL('**/');
  }
}

