import { getApi } from "..";
import {
  ApiResponse,
  CustomerSalesReport,
  ProductReport,
  ReturnReport,
  SaleReport,
  SearchOptions,
} from "@/types/entities";
import { GetSales } from "./sales";

export interface GetSalesReport extends ApiResponse {
  statusCode: number;
  report: SaleReport[];
}

export interface GetReturnsReport extends ApiResponse {
  statusCode: number;
  report: ReturnReport[];
}

export interface GetCustomerSalesReport extends ApiResponse {
  statusCode: number;
  report: CustomerSalesReport[];
}

export interface GetProductsSalesReport extends ApiResponse {
  statusCode: number;
  report: ProductReport[];
}

export const getSalesReport = async (
  startDate: string,
  endDate: string
): Promise<GetSalesReport> => {
  const response = await getApi<GetSalesReport>({
    url: `/reports/sales?from=${startDate}&to=${endDate}`,
  });
  return response;
};

export const getCompletedSalesReport = async (
  options: SearchOptions
): Promise<GetSales> => {
  const { from, to } = options;
  let url = "/reports/sales/sold";
  if (from) {
    url += `?from=${from}`;
    if (to) url += `&to=${to}`;
  }
  const response = await getApi<GetSales>({ url });
  return response;
};

export const getReturnsReport = async (
  startDate: string,
  endDate: string
): Promise<GetReturnsReport> => {
  const response = await getApi<GetReturnsReport>({
    url: `/reports/returns?from=${startDate}&to=${endDate}`,
  });
  return response;
};

export const getCustomerSalesReport = async (
  startDate: string,
  endDate: string
): Promise<GetCustomerSalesReport> => {
  const response = await getApi<GetCustomerSalesReport>({
    url: `/reports/customer-orders?from=${startDate}&to=${endDate}`,
  });
  return response;
};

export const getProductSalesReport = async (
  startDate: string,
  endDate: string
): Promise<GetProductsSalesReport> => {
  const response = await getApi<GetProductsSalesReport>({
    url: `/reports/product-report?from=${startDate}&to=${endDate}`,
  });
  return response;
};
