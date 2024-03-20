import { ErrorType, SaleType } from "@/types/entities";
import { getApi } from "..";

export type SalesResponse = {
  statusCode: number;
  sales: SaleType[];
  errors?: ErrorType[];
};

export type DeleteResp = {
  statusCode: number;
  sale: SaleType;
  errors?: ErrorType[];
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

export const getSale = async (id: string): Promise<DeleteResp> => {
  const response = await getApi<DeleteResp>({ url: `/sales/${id}` });
  console.log(id, "pppppp");

  return response;
};
