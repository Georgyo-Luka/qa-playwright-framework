import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('administrador acessa a home após login válido', async ({ page, loginPage, registeredUser }) => {
    await loginPage.login(registeredUser.email, registeredUser.password);

    await expect(page).toHaveURL(/\/admin\/home/);
  });

  test('exibe alerta para credenciais inválidas', async ({ loginPage, registeredUser }) => {
    await loginPage.login(registeredUser.email, 'senha-errada');

    await expect(loginPage.alert).toContainText('Email e/ou senha inválidos');
  });
});
