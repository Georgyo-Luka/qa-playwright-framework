import { test, expect } from '../../src/fixtures/test.fixture';
import { buildUser } from '../../src/factories/user.factory';

test.describe('API /usuarios', () => {
  test('cria um usuário com dados válidos', async ({ api }) => {
    const user = buildUser();

    const response = await api.createUser(user);
    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body._id).toBeTruthy();

    await api.deleteUser(body._id);
  });

  test('não permite cadastrar e-mail já existente', async ({ api, registeredUser }) => {
    const duplicate = buildUser({ email: registeredUser.email });

    const response = await api.createUser(duplicate);

    expect(response.status()).toBe(400);
    expect((await response.json()).message).toBe('Este email já está sendo usado');
  });
});

test.describe('API /login', () => {
  test('retorna token para credenciais válidas', async ({ api, registeredUser }) => {
    const response = await api.login(registeredUser.email, registeredUser.password);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.authorization).toMatch(/^Bearer /);
  });

  test('recusa senha inválida', async ({ api, registeredUser }) => {
    const response = await api.login(registeredUser.email, 'senha-errada');

    expect(response.status()).toBe(401);
    expect((await response.json()).message).toBe('Email e/ou senha inválidos');
  });
});
