import { faker } from '@faker-js/faker';

export interface User {
  nome: string;
  email: string;
  password: string;
  administrador: 'true' | 'false';
}

/**
 * Builds a valid ServeRest user with unique data.
 * Pass overrides to create specific scenarios (e.g. a non-admin user or an invalid email).
 */
export function buildUser(overrides: Partial<User> = {}): User {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email({ provider: 'qa.test' }).toLowerCase(),
    password: faker.internet.password({ length: 12 }),
    administrador: 'true',
    ...overrides,
  };
}
