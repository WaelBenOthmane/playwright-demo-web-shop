import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validCredentials } from './users';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // 1. Setup : tout ce que tu répètes actuellement dans beforeEach + chaque test
    await page.goto('');
    const loginPage = new LoginPage(page);
    await loginPage.openLoginForm();
    await loginPage.login(validCredentials.email, validCredentials.password);

    // 2. "use" donne la main au test — c'est ici que ton scénario s'exécute
    await use(page);

    // 3. (optionnel) Teardown après le test — rien de nécessaire ici pour l'instant
  },
});

export { expect } from '@playwright/test';