import Stripe from "stripe";
import { deleteApi, getApi, patchApi, postApi } from "..";
import { CustomerSource, ErrorType, PaymentMethodType } from "@/types/entities";

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
