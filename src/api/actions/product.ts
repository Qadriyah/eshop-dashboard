import { deleteApi, getApi } from "..";
import { ErrorType, ProductType } from "@/types/entities";

export type GetProduct = {
  statusCode: number;
  product: ProductType;
};

export type GetProducts = {
  statusCode: number;
  products: ProductType[];
};

export type DeleteProduct = {
  statusCode: number;
  product: ProductType;
  message: string;
  errors: ErrorType[];
};

export const getProducts = async (): Promise<GetProducts> => {
  const response = await getApi<GetProducts>({ url: "/products" });
  return response;
};

export const getProduct = async (id: string): Promise<GetProduct> => {
  const response = await getApi<GetProduct>({ url: `/products/${id}` });
  return response;
};

export const deleteProduct = async (id: string): Promise<DeleteProduct> => {
  const response = await deleteApi<DeleteProduct>({ url: `/products/${id}` });
  return response;
};
