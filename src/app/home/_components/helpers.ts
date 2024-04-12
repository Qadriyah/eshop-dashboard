import moment from "moment";
import { ProductType, SaleType } from "@/types/entities";

type PercentageType = {
  increase: boolean;
  value: number;
};

export type WeeklySaleType = {
  day: string;
  sales: number;
  total: number;
};

export type TopSaleType = {
  name: string;
  sales: number;
  total: number;
};

export type VisibilityType = {
  isVisible: boolean;
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

export const getProductEarnings = (currentSales: SaleType[]) => {
  let total = 0;
  const map: Record<string, any> = {};
  currentSales.forEach((sale) => {
    sale.lineItems.forEach((product) => {
      const lineTotal = product.quantity * product.price;
      total += lineTotal;
      if (map[product.id]) {
        map[product.id].total = map[product.id].total + lineTotal;
      } else {
        map[product.id] = {
          name: product.name,
          total: lineTotal,
        };
      }
    });
  });

  return {
    total,
    earnings: Object.values(map),
  };
};

export const getDailySales = (
  currentSales: SaleType[],
  date: string
): { sales: WeeklySaleType[]; total: number } => {
  const weeks: Record<string, WeeklySaleType> = {};
  let total = 0;
  const key = moment(date).format("MMM");
  for (let i = 1; i < moment(date).daysInMonth() + 1; i++) {
    weeks[`${key}-${i}`] = {
      day: `${key} ${i}`,
      sales: 0,
      total: 0,
    };
  }

  currentSales.forEach((sale) => {
    const key = moment(sale.createdAt).format("MMM-D");
    sale.lineItems.forEach((product) => {
      const lineTotal = product.quantity * product.price;
      weeks[key].total = weeks[key].total + lineTotal;
      weeks[key].sales = weeks[key].sales + product.quantity;
      total += lineTotal;
    });
  });
  return {
    total,
    sales: Object.values(weeks),
  };
};

export const getAverageDailySales = (
  dailySales: number,
  weeklySales: WeeklySaleType[]
): string => {
  const weeklyTotal = weeklySales.reduce(
    (total, sale) => total + sale.sales,
    0
  );
  return Number((dailySales / weeklyTotal) * 100).toFixed(1);
};

export const topSellingProduct = (
  products: ProductType[],
  sales: SaleType[]
) => {
  const productList = Object.assign(
    {},
    ...products?.map((product) => ({
      [product.id]: {
        name: product.name,
        sales: 0,
        total: 0,
      },
    }))
  );

  if (Object.keys(productList).length > 0) {
    sales.forEach((sale) => {
      sale.lineItems.forEach((product) => {
        productList[product.id].sales += product.quantity;
        productList[product.id].total += product.quantity * product.price;
      });
    });
  }
  return Object.values(productList);
};
