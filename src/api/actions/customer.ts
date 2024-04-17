import Stripe from "stripe";
import { deleteApi, getApi, patchApi, postApi } from "..";
import {
  CustomerSource,
  PaymentMethodType,
  UserType,
  SaleType,
  SearchOptions,
  ProfileType,
  ApiResponse,
} from "@/types/entities";

export interface CreatePaymentMethod extends ApiResponse {
  statusCode: number;
  paymentMethod: PaymentMethodType;
  message: string;
}

export interface GetPaymentMethods extends ApiResponse {
  statusCode: number;
  paymentMethods: PaymentMethodType[];
}

export interface DeletePaymentMethod extends ApiResponse {
  statusCode: number;
  customer: Stripe.Customer;
  message: string;
}

export interface GetCustomers extends ApiResponse {
  statusCode: number;
  users: UserType[];
}

export interface GetCustomer extends ApiResponse {
  statusCode: number;
  user: UserType;
}

export interface UpdateCustomerResponse extends ApiResponse {
  statusCode: number;
  message: string;
  user: UserType;
}

export interface TransactionsResponse extends ApiResponse {
  statusCode: number;
  sales: SaleType[];
}

export interface FileUploadResponse extends ApiResponse {
  statusCode: number;
  filePath: string;
}

export interface UpdateProfileResponse extends ApiResponse {
  statusCode: number;
  profile: ProfileType;
}

export const createPaymentMethod = async (
  token: string
): Promise<CreatePaymentMethod> => {
  const data = await postApi<CreatePaymentMethod>({
    url: `/customers/payment-methods/${token}`,
  });
  return data;
};

export const updatePaymentMethod = async (
  cardId: string,
  data: CustomerSource
): Promise<CreatePaymentMethod> => {
  const response = await patchApi<CreatePaymentMethod>({
    url: `/customers/payment-methods/${cardId}`,
    data,
  });
  return response;
};

export const updateDefaultSource = async (
  cardId: string
): Promise<CreatePaymentMethod> => {
  const data = await patchApi<CreatePaymentMethod>({
    url: `/customers/payment-methods/source/${cardId}`,
  });
  return data;
};

export const getPaymentMethods = async (): Promise<GetPaymentMethods> => {
  const data = await getApi<GetPaymentMethods>({
    url: `/customers/payment-methods/cards`,
  });
  return data;
};

export const deletePaymentMethod = async (
  source: string
): Promise<DeletePaymentMethod> => {
  const data = await deleteApi<DeletePaymentMethod>({
    url: `/customers/payment-methods/${source}`,
  });
  return data;
};

export const getUsers = async (
  options: SearchOptions
): Promise<GetCustomers> => {
  const { user, page, limit } = options;
  let url = "/users";
  url += `?page=${page ? page : 1}`;
  if (limit) url += `&limit=${limit}`;
  if (user) url += `&user=${user}`;

  const response = await getApi<GetCustomers>({ url });
  return response;
};

export const getCustomer = async (id: string): Promise<GetCustomer> => {
  const response = await getApi<GetCustomer>({ url: `/users/${id}` });

  return response;
};

export const suspendCustomer = async (
  id: string,
  data: { suspended: boolean }
): Promise<UpdateCustomerResponse> => {
  const response = await patchApi<UpdateCustomerResponse>({
    url: `/users/${id}`,
    data,
  });

  return response;
};

export const deleteCustomer = async (
  id: string
): Promise<UpdateCustomerResponse> => {
  const response = await deleteApi<UpdateCustomerResponse>({
    url: `/users/${id}`,
  });

  return response;
};

export const getTransactions = async (
  id: string,
  options: SearchOptions
): Promise<TransactionsResponse> => {
  const { page, limit } = options;
  let url = `/sales/customer/${id}`;
  url += `?page=${page ? page : 1}`;
  if (limit) url += `&limit=${limit}`;

  const response = await getApi<TransactionsResponse>({ url });
  return response;
};

export const getCustomerPaymentMethods = async (
  customerId: string
): Promise<GetPaymentMethods> => {
  const response = await getApi<GetPaymentMethods>({
    url: `/customers/payment-methods/${customerId}/cards`,
  });

  return response;
};

export const getUser = async (id: string): Promise<GetCustomer> => {
  const response = await getApi<GetCustomer>({
    url: `/users/${id}`,
  });

  return response;
};

export const uploadUserImage = async (
  userId: string,
  data: any
): Promise<FileUploadResponse> => {
  const response = await postApi<FileUploadResponse>({
    url: `/files/upload/user/${userId}/avatar`,
    data,
    customHeaders: { "Content-Type": "multipart/form-data" },
  });

  return response;
};

export const updateUser = async (
  userId: string,
  data: ProfileType
): Promise<UpdateProfileResponse> => {
  const response = await patchApi<UpdateProfileResponse>({
    url: `/profile/${userId}`,
    data,
  });

  return response;
};
