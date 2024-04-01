import { SaleType } from "@/types/entities";

type PercentageType = {
  increase: boolean;
  value: number;
};

export const calPercentageIncrease = (
  currentSales: SaleType[],
  prevSales: SaleType[]
): PercentageType => {
  if (prevSales.length === 0) {
    return {
      increase: true,
      value: 100,
    };
  }
  if (currentSales.length < prevSales.length) {
    const percentage =
      ((prevSales.length - currentSales.length) / currentSales.length) * 100;
    return {
      increase: false,
      value: +Number(percentage).toFixed(1),
    };
  }

  const percentage =
    ((currentSales.length - prevSales.length) / prevSales.length) * 100;
  return {
    increase: true,
    value: +Number(percentage).toFixed(1),
  };
};

export const calProgress = (
  currentSales: SaleType[],
  prevSales: SaleType[]
): number => {
  if (prevSales.length === 0) {
    return 100;
  }

  return +Number((currentSales.length / prevSales.length) * 100).toFixed(1);
};
