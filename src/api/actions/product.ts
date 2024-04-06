import { deleteApi, getApi, patchApi, postApi } from "..";
import { ErrorType, ProductType, SearchOptions } from "@/types/entities";

export type GetProduct = {
  statusCode: number;
  product: ProductType;
};

export type GetProducts = {
  statusCode: number;
  products: ProductType[];
};

export type PostProduct = {
  statusCode: number;
  product: ProductType;
  message: string;
  errors: ErrorType[];
};

export type AddProduct = {
  statusCode: number;
  message: string;
  product: ProductType;
  errors?: ErrorType[];
};

export const getProducts = async (
  options: SearchOptions
): Promise<GetProducts> => {
  const { page, limit, status } = options;
  let url = "/products";
  url += `?page=${page ? page : 1}`;
  if (limit) url += `&limit=${limit}`;
  if (status) url += `&status=${status}`;
  const response = await getApi<GetProducts>({ url });
  return response;
};

export const getProduct = async (id: string): Promise<GetProduct> => {
  const response = await getApi<GetProduct>({ url: `/products/${id}` });
  return response;
};

export const deleteProduct = async (id: string): Promise<PostProduct> => {
  const response = await deleteApi<PostProduct>({ url: `/products/${id}` });
  return response;
};

export const updateProduct = async (
  id: string,
  data: ProductType
): Promise<PostProduct> => {
  const response = await patchApi<PostProduct>({
    url: `/products/${id}`,
    data,
  });
  return response;
};

export const addProduct = async (data: ProductType): Promise<PostProduct> => {
  const response = await postApi<PostProduct>({ url: "/products", data });
  return response;
};
