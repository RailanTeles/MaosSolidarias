import { Usuario } from './usuario.model';

describe('Usuario', () => {
  it('should create an instance', () => {
    expect(new Usuario(999, 99999999999, "teste", "teste@gmail.com", "99999999999", "senha123", "ADMIN", false)).toBeTruthy();
  });
});
