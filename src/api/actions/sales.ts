import { ErrorType, SaleType } from "@/types/entities";
import { getApi, patchApi } from "..";

export type GetSales = {
  statusCode: number;
  sales: SaleType[];
  errors?: ErrorType[];
};

export type GetSale = {
  statusCode: number;
  sale: SaleType;
  errors?: ErrorType[];
};

export type SaleDetailsTypes = {
  statusCode: number;
  session: any;
};

export const getCustomerSales = async (): Promise<GetSales> => {
  const response = await getApi<GetSales>({
    url: "/sales/customer/my/orders",
  });
  return response;
};

export const getSales = async (): Promise<GetSales> => {
  const response = await getApi<GetSales>({ url: "/sales" });

  return response;
};

export const getSale = async (id: string): Promise<GetSale> => {
  const response = await getApi<GetSale>({ url: `/sales/${id}` });

  return response;
};

export const updateSale = async (
  id: string,
  data: SaleType
): Promise<GetSale> => {
  const response = await patchApi<GetSale>({
    url: `/sales/${id}`,
    data,
  });

  return response;
};
