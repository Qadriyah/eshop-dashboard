import { ErrorType, SaleType } from "@/types/entities";
import { getApi } from "..";
// import Stripe from "stripe";

export type SalesResponse = {
  statusCode: number;
  sales: SaleType[];
  errors?: ErrorType[];
};

export type SaleTypes = {
  statusCode: number;
  sale: SaleType;
  errors?: ErrorType[];
};

export type SaleDetailsTypes = {
  statusCode: number;
  session: any;
};

export const getCustomerSales = async (): Promise<SalesResponse> => {
  const response = await getApi<SalesResponse>({
    url: "/sales/customer/my/orders",
  });
  return response;
};

export const getSales = async (): Promise<SalesResponse> => {
  const response = await getApi<SalesResponse>({ url: "/sales" });

  return response;
};

export const getSale = async (id: string): Promise<SaleTypes> => {
  const response = await getApi<SaleTypes>({ url: `/sales/${id}` });

  return response;
};
