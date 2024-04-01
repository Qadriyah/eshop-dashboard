import { getApi } from "..";
import {
  CustomerSalesReport,
  ErrorType,
  ProductReport,
  ReturnReport,
  SaleReport,
  SearchOptions,
} from "@/types/entities";
import { GetSales } from "./sales";

export type GetSalesReport = {
  statusCode: number;
  report: SaleReport[];
  errors?: ErrorType[];
};

export type GetReturnsReport = {
  statusCode: number;
  report: ReturnReport[];
  errors?: ErrorType[];
};

export type GetCustomerSalesReport = {
  statusCode: number;
  report: CustomerSalesReport[];
  errors?: ErrorType[];
};

export type GetProductsSalesReport = {
  statusCode: number;
  report: ProductReport[];
  errors?: ErrorType[];
};

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
