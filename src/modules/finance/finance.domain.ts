export class Finance {
  public static fessMonthPercentage = 0.02;

  constructor(
    private readonly maxInstallments: number,
    private readonly totalValue: number
  ) {}

  private truncateToTwoDecimals(installment: number) {
    return Math.floor(installment * 100) / 100;
  }

  public getInstallment() {
    const pmt =
      this.totalValue *
      (Finance.fessMonthPercentage /
        (1 - Math.pow(1 + Finance.fessMonthPercentage, -this.maxInstallments)));
    return this.truncateToTwoDecimals(pmt);
  }
}
