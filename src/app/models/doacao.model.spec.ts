import { Doacao } from './doacao.model';

describe('Doacao', () => {
  it('should create an instance', () => {
    expect(new Doacao(999999, 9999, 999, 999, new Date())).toBeTruthy();
  });
});
