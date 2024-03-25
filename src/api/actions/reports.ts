import { deleteApi, getApi, patchApi, postApi } from "..";
import {
  ErrorType,
  ProductType,
  ReturnsReport,
  SaleReport,
} from "@/types/entities";

export type GetSalesReport = {
  statusCode: number;
  report: SaleReport[];
  errors?: ErrorType[];
};

export type GetReturnsReport = {
  statusCode: number;
  report: ReturnsReport[];
  errors?: ErrorType[];
};

export const getSalesReport = async (
  startDate: string,
  endDate: string
): Promise<GetSalesReport> => {
  const response = await getApi<GetSalesReport>({
    url: `/reports/sales?start-date=${startDate}&end-date=${endDate}`,
  });
  return response;
};

export const getReturnsReport = async (
  startDate: string,
  endDate: string
): Promise<GetReturnsReport> => {
  const response = await getApi<GetReturnsReport>({
    url: `/reports/returns?start-date=${startDate}&end-date=${endDate}`,
  });
  return response;
};
