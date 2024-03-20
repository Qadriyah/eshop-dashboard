import { ErrorType, SaleType } from "@/types/entities";
import { getApi } from "..";

export type SalesResponse = {
  statusCode: number;
  sales: SaleType[];
  errors?: ErrorType[];
};

export const getCustomerSales = async (): Promise<SalesResponse> => {
  const response = await getApi<SalesResponse>({
    url: "/sales/customer/my/orders",
  });
  return response;
};
