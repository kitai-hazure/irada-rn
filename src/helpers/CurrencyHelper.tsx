export const CurrencyHelper = {
  computeBalanceFromHex: (balance: string, decimals: number): number => {
    let b: any = (balance as any) / Math.pow(10, decimals);
    return b;
  },
};
