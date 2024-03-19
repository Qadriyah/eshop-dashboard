import Stripe from "stripe";

export type AddressType = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

export type ProductType = {
  id?: string;
  sku?: string;
  name: string;
  status?: string;
  icon?: string;
  images?: string[];
  description: string;
  price: number;
  discountType: string;
  percentDiscount: number;
  fixedDiscount: number;
  stock: number;
  allowBackorders: boolean;
  weight: number;
  length: number;
  width: number;
  height: number;
  slug?: string;
};

export type ProfileType = {
  id: string;
  user: UserType;
  firstName: string;
  lastName: string;
  phone: string;
  customer: string;
};

export type SaleType = {
  id: string;
  user: string;
  session: string;
  lineItems: SaleItemType[];
  status: SaleStatusType;
  orderNumber: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  refunded: boolean;
};

export type SaleItemType = {
  name: string;
  price: number;
  quantity: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  icon: string;
};

export type SaleStatusType =
  | "Pending"
  | "Processing"
  | "Completed"
  | "Delivering"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

export type UserType = {
  email: string;
  avator: string;
  roles: string[];
  refreshToken: string;
  deleted: boolean;
  suspended: boolean;
};

export type PaymentMethodType = {
  id: string;
  primary: boolean;
  expiry: string;
  billing_address: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2?: string;
      postal_code: string;
      state: string;
    };
    email?: string;
    name: string;
    phone?: string;
  };
} & Stripe.PaymentMethod.Card;

export type ErrorType = {
  field: string;
  message: string;
};

export type CustomerSource = {
  account_holder_name?: string;
  account_holder_type?: string;
  address_city?: string;
  address_country?: string;
  address_line1?: string;
  address_line2?: string;
  address_state?: string;
  address_zip?: string;
  name?: string;
};

export type MessageType = {
  name: string;
  email: string;
  phone?: string;
  comment: string;
};

export type SaleReport = {
  key: string;
  date: string;
  orders: number;
  sold: number;
  tax: number;
  total: number;
};

export type ReturnsReport = {
  key: string;
  date: string;
  returned: number;
  refunded: number;
  totalRefunded: number;
};

export type CustomerSalesReport = {
  key: string;
  email: string;
  fullName: string;
  status: string;
  createdAt: string;
  orders: number;
  products: number;
  total: number;
};

export type ProductReport = {
  key: string;
  name: string;
  sold: number;
  total: number;
};
