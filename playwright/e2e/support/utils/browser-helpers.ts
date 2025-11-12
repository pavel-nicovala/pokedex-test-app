import { Page } from '@playwright/test';

/**
 * Clears browser cache and cookies for a fresh session
 * Note: localStorage/sessionStorage can only be cleared after navigation to a valid URL
 */
export async function clearBrowserState(page: Page): Promise<void> {
  await page.context().clearCookies();
  // Only clear storage if we're on a valid page (not about:blank)
  const url = page.url();
  if (url && url !== 'about:blank') {
    try {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    } catch {
      // Ignore if storage is not accessible
    }
  }
}

/**
 * Waits for the page to be fully loaded
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Takes a screenshot with a descriptive name
 */
export async function takeScreenshot(
  page: Page,
  name: string
): Promise<void> {
  await page.screenshot({ path: `test-results/${name}.png`, fullPage: true });
}

