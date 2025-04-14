import { Campanha } from './campanha.model';

describe('Campanha', () => {
  it('should create an instance', () => {
    expect(new Campanha(99999, "Teste", "Testando", 99999, 0, new Date("2000-01-01"), new Date("2000-12-01"))).toBeTruthy();
  });
});
