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

export type GetUsers = {
  createdAt: string;
  deleted: boolean;
  email: string;
  refreshToken: string;
  roles: string[];
  updatedAt: string;
  id: string;
  errors?: ErrorType[];
};

export type Customers = GetUsers & {
  profile: {
    user: string;
    createdAt: string;
    updatedAt: string;
    fullName: string;
    id: string;
  };
};

export type CustomerTypes = {
  statusCode: number;
  users: Customers[];
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

export const getUsers = async (): Promise<GetUsers[]> => {
  const response = await getApi<GetUsers[]>({ url: "/users" });

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
  user: Customers;
}> => {
  const response = await getApi<{
    statusCode: number;
    user: Customers;
  }>({ url: `/users/${id}` });

  return response;
};
