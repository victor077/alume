import { Finance } from "./finance.domain";

describe("Finance", () => {
  it("deve calcular corretamente a parcela usando a fórmula financeira", () => {
    const total = 1000;
    const installments = 12;

    const finance = new Finance(installments, total);

    const expectedRawPMT =
      total *
      (Finance.fessMonthPercentage /
        (1 - Math.pow(1 + Finance.fessMonthPercentage, -installments)));

    const expected = Math.floor(expectedRawPMT * 100) / 100;
    const result = finance.getInstallment();

    expect(result).toBe(expected);
  });

  it("deve retornar 0 se totalValue for 0", () => {
    const finance = new Finance(12, 0);
    const result = finance.getInstallment();
    expect(result).toBe(0);
  });

  it("deve funcionar com apenas 1 parcela", () => {
    const finance = new Finance(1, 1000);

    const expectedRawPMT =
      1000 *
      (Finance.fessMonthPercentage /
        (1 - Math.pow(1 + Finance.fessMonthPercentage, -1)));

    const expected = Math.floor(expectedRawPMT * 100) / 100;
    const result = finance.getInstallment();

    expect(result).toBe(expected);
  });

  it("deve usar a taxa de juros estática da classe", () => {
    expect(Finance.fessMonthPercentage).toBe(0.02);
  });
});
