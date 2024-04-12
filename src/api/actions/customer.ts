import Stripe from "stripe";
import { deleteApi, getApi, patchApi, postApi } from "..";
import {
  CustomerSource,
  ErrorType,
  PaymentMethodType,
  UserType,
  SaleType,
  SearchOptions,
  ProfileType,
  ChangePasswordProps,
} from "@/types/entities";

export type CreatePaymentMethod = {
  statusCode: number;
  paymentMethod: PaymentMethodType;
  message: string;
  errors?: ErrorType[];
};

export type GetPaymentMethods = {
  statusCode: number;
  paymentMethods: PaymentMethodType[];
  errors?: ErrorType[];
};

export type DeletePaymentMethod = {
  statusCode: number;
  customer: Stripe.Customer;
  message: string;
  errors?: ErrorType[];
};

export type CustomerTypes = {
  statusCode: number;
  users: UserType[];
  errors?: ErrorType[];
};

export type CustomerUpdateResponse = {
  statusCode: number;
  message: string;
  user: UserType;
  errors?: ErrorType[];
};

export type TransactionsResponse = {
  statusCode: number;
  sales: SaleType[];
};

export type SingleCustomerResponse = {
  statusCode: number;
  user: UserType;
  errors?: ErrorType[];
};

export type uploadResponse = {
  statusCode: number;
  filePath: string;
  errors?: ErrorType[];
};

export type UpdateUserResponse = {
  statusCode: number;
  profile: ProfileType;
  errors?: ErrorType[];
};

export type ChangePasswordResponse = {
  statusCode: number;
  message: string;
  errors?: ErrorType[];
};

export type EmailPasswordResponse = {
  statusCode: number;
  message: string;
  accessToken: string;
  errors?: ErrorType[];
};

export const createPaymentMethod = async (
  token: any
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
): Promise<CustomerTypes> => {
  const { user, page, limit } = options;
  let url = "/users";
  url += `?page=${page ? page : 1}`;
  if (limit) url += `&limit=${limit}`;
  if (user) url += `&user=${user}`;

  const response = await getApi<CustomerTypes>({ url });
  return response;
};

export const getCustomer = async (
  id: string
): Promise<{
  statusCode: number;
  user: UserType;
}> => {
  const response = await getApi<{
    statusCode: number;
    user: UserType;
  }>({ url: `/users/${id}` });

  return response;
};

export const suspendCustomer = async (
  id: string,
  data: { suspended: boolean }
): Promise<CustomerUpdateResponse> => {
  const response = await patchApi<CustomerUpdateResponse>({
    url: `/users/${id}`,
    data,
  });

  return response;
};

export const deleteCustomer = async (id: string): Promise<CustomerTypes> => {
  const response = await deleteApi<CustomerTypes>({ url: `/users/${id}` });

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

export const getUser = async (id: string): Promise<SingleCustomerResponse> => {
  const response = await getApi<SingleCustomerResponse>({
    url: `/users/${id}`,
  });

  return response;
};

export const uploadUserImage = async (
  userId: string,
  data: any
): Promise<uploadResponse> => {
  const response = await postApi<uploadResponse>({
    url: `/files/upload/user/${userId}/avatar`,
    data,
    customHeaders: { "Content-Type": "multipart/form-data" },
  });

  return response;
};

export const updateUser = async (
  userId: string,
  data: ProfileType
): Promise<UpdateUserResponse> => {
  const response = await patchApi<UpdateUserResponse>({
    url: `/profile/${userId}`,
    data,
  });

  return response;
};

export const changeForLoggedin = async (
  id: string,
  data: ChangePasswordProps
): Promise<ChangePasswordResponse> => {
  const response = await patchApi<ChangePasswordResponse>({
    url: `/users/${id}/reset-password`,
    data,
  });

  return response;
};

export const sendPasswordEmail = async (data: {
  email: string;
}): Promise<EmailPasswordResponse> => {
  const response = await postApi<EmailPasswordResponse>({
    url: "/auth/reset-password-request",
    data,
  });

  return response;
};
