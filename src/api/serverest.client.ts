import { APIRequestContext, APIResponse } from '@playwright/test';
import { User } from '../factories/user.factory';

/**
 * Typed client for the ServeRest API.
 * Tests talk to this class instead of building HTTP calls by hand,
 * so an endpoint change is fixed in one place.
 */
export class ServeRestClient {
  constructor(private readonly request: APIRequestContext) {}

  createUser(user: User): Promise<APIResponse> {
    return this.request.post('/usuarios', { data: user });
  }

  getUser(id: string): Promise<APIResponse> {
    return this.request.get(`/usuarios/${id}`);
  }

  deleteUser(id: string): Promise<APIResponse> {
    return this.request.delete(`/usuarios/${id}`);
  }

  login(email: string, password: string): Promise<APIResponse> {
    return this.request.post('/login', { data: { email, password } });
  }

  listProducts(): Promise<APIResponse> {
    return this.request.get('/produtos');
  }
}
