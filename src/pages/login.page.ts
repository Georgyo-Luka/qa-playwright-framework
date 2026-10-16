import { Locator, Page } from '@playwright/test';

/**
 * Page Object for the ServeRest login screen.
 * Locators use data-testid attributes, which survive layout and text changes.
 */
export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly alert: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('senha');
    this.submitButton = page.getByTestId('entrar');
    this.alert = page.getByRole('alert');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
