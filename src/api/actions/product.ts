import { deleteApi, getApi, patchApi, postApi } from "..";
import { ApiResponse, ProductType, SearchOptions } from "@/types/entities";

export interface GetProduct extends ApiResponse {
  statusCode: number;
  product: ProductType;
}

export interface GetProducts extends ApiResponse {
  statusCode: number;
  products: ProductType[];
}

export interface CreateProductResponse extends ApiResponse {
  statusCode: number;
  message: string;
  product: ProductType;
}

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

export const deleteProduct = async (
  id: string
): Promise<CreateProductResponse> => {
  const response = await deleteApi<CreateProductResponse>({
    url: `/products/${id}`,
  });
  return response;
};

export const updateProduct = async (
  id: string,
  data: ProductType
): Promise<CreateProductResponse> => {
  const response = await patchApi<CreateProductResponse>({
    url: `/products/${id}`,
    data,
  });
  return response;
};

export const addProduct = async (
  data: ProductType
): Promise<CreateProductResponse> => {
  const response = await postApi<CreateProductResponse>({
    url: "/products",
    data,
  });
  return response;
};
