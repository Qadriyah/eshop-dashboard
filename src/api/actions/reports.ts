import { deleteApi, getApi, patchApi, postApi } from "..";
import { ErrorType, ProductType, SaleReport } from "@/types/entities";

export type GetSalesReport = {
  statusCode: number;
  report: SaleReport[];
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
