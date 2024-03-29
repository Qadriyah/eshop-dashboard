import Stripe from "stripe";
import { deleteApi, getApi, patchApi, postApi } from "..";
import {
  CustomerSource,
  ErrorType,
  PaymentMethodType,
  UserType,
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

export const getUsers = async (): Promise<CustomerTypes[]> => {
  const response = await getApi<CustomerTypes[]>({ url: "/users" });

  return response;
};

export const getCustomers = async (): Promise<CustomerTypes> => {
  const response = await getApi<CustomerTypes>({ url: "/users" });

  return response;
};

export const getCustomer = async (
  id: string
): Promise<{
  statusCode: number;
  user: CustomerTypes;
}> => {
  const response = await getApi<{
    statusCode: number;
    user: CustomerTypes;
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
