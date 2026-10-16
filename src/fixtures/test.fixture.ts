import { test as base, request as playwrightRequest } from '@playwright/test';
import { ServeRestClient } from '../api/serverest.client';
import { LoginPage } from '../pages/login.page';
import { buildUser, User } from '../factories/user.factory';

type Fixtures = {
  api: ServeRestClient;
  loginPage: LoginPage;
  registeredUser: User;
};

const API_URL = process.env.API_URL ?? 'https://serverest.dev';

/**
 * Custom fixtures:
 * - api: typed client for the ServeRest API.
 * - loginPage: Page Object ready to use.
 * - registeredUser: a user created through the API before the test and deleted after it.
 *   E2E tests start from a known state without going through the sign-up UI.
 */
export const test = base.extend<Fixtures>({
  api: async ({}, use) => {
    const context = await playwrightRequest.newContext({ baseURL: API_URL });
    await use(new ServeRestClient(context));
    await context.dispose();
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registeredUser: async ({ api }, use) => {
    const user = buildUser();
    const response = await api.createUser(user);
    const { _id } = await response.json();

    await use(user);

    await api.deleteUser(_id);
  },
});

export { expect } from '@playwright/test';
