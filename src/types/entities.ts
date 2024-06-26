import Stripe from "stripe";

export type AddressType = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

export type ProductType = {
  id: string;
  sku: string;
  name: string;
  status: string;
  icon: string;
  images: string[];
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
  slug: string;
};

export type ProfileType = {
  id?: string;
  user: UserType;
  firstName: string;
  lastName: string;
  phone?: string;
  customer?: string;
  fullName?: string;
};

export type CustomerTypes = {
  email: string;
  name: string;
  phone: string;
};

export type SaleType = {
  id: string;
  user: {
    avator: string;
    email: string;
    id: string;
    roles: string[];
    profile: {
      id: string;
      createdAt: string;
      fullName: string;
      updatedAt: string;
      user: string;
      phone: string;
    };
  };
  session: string;
  lineItems: SaleItemType[];
  status: SaleStatusType;
  orderNumber: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  refunded: boolean;
  billingAddress: AddressType;
  customer: CustomerTypes;
  shipping: number;
  shippingAddress: AddressType;
  tax: number;
};

export type SaleItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  icon: string;
  sku: number;
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
  id: string;
  email: string;
  avator: string;
  roles: string[];
  refreshToken: string;
  deleted: boolean;
  suspended: boolean;
  profile: {
    user: string;
    createdAt: string;
    updatedAt: string;
    fullName: string;
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    customer: string;
  };
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
      line2: string;
      postal_code: string;
      state: string;
    };
    email: string;
    name: string;
    phone: string;
  };
} & Stripe.PaymentMethod.Card;

export type ErrorType = {
  field: string;
  message: string;
};

export type CustomerSource = {
  account_holder_name: string;
  account_holder_type: string;
  address_city: string;
  address_country: string;
  address_line1: string;
  address_line2: string;
  address_state: string;
  address_zip: string;
  name: string;
};

export type MessageType = {
  name: string;
  email: string;
  phone: string;
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

export type ReturnReport = {
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

export type SearchOptions = {
  page?: number;
  limit?: number;
  user?: string;
  from?: string;
  to?: string;
  status?: string;
};

export interface ApiResponse {
  errors?: ErrorType[];
}
