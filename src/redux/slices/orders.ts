import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userOrdeProps = {
  customerName: string;
  customerImage: string;
  customerEmail: string;
  customerContact: string;
};
type orderProducts = {
  productImage: string;
  date: string;
  productId: string;
  qty: number;
  unitCost: number;
  productName: string;
};
export interface OrdersProps {
  key?: string;
  orderId: string | number;
  status: string;
  total?: number | string;
  dateAdded: string;
  dateModified: string;
  customer: userOrdeProps;
  paymentAddress: string;
  shippingAddress: string;
  invoice: string;
  products: orderProducts[];
}

const initialState: OrdersProps[] = [
  {
    key: `${Math.round(Math.random() * 100000)}`,
    customer: {
      customerContact: "+1 89 000000999",
      customerEmail: "hmstanely@email",
      customerImage: `/assets/images/stylecollection.jpg`,
      customerName: "H.M.Stanely",
    },
    shippingAddress:
      "Unit 1/23 Hastings Road, Melbourne 3000, Victoria, Australia.",
    paymentAddress:
      "Unit 1/23 Hastings Road, Melbourne 3000, Victoria, Australia.",
    invoice: "#INV-000414",
    products: [
      {
        date: "04/04/2023",
        productId: `${Math.round(Math.random() * 100000)}`,
        productImage: "/assets/images/girl-fashion.jpg",
        qty: 2,
        unitCost: 22,
        productName: "Smart Watch",
      },
    ],
    orderId: `${Math.round(Math.random() * 100000)}`,
    status: "Denied",
    total: 240,
    dateAdded: "05/09/2021",
    dateModified: "03/03/2022",
  },
  {
    key: `${Math.round(Math.random() * 100000)}`,
    customer: {
      customerContact: "+16 89 899000999",
      customerEmail: "patoranking2002@email",
      customerImage: `/assets/images/photo.jpeg`,
      customerName: "Pato Ranking",
    },
    shippingAddress:
      "Unit 1/23 Hastings Road, Melbourne 3000, London, Australia.",
    paymentAddress:
      "Unit 1/23 Hastings Road, Melbourne 3000, Manchester, Australia.",
    invoice: "#INV-000415",
    products: [
      {
        date: "03/07/2023",
        productId: `${Math.round(Math.random() * 100000)}`,
        productImage: "/assets/images/newlook.jpg",
        qty: 1,
        unitCost: 22,
        productName: "Apple i phohe",
      },
      {
        date: "03/07/2023",
        productId: `${Math.round(Math.random() * 100000)}`,
        productImage: "/assets/images/newlook.jpg",
        qty: 1,
        unitCost: 22,
        productName: "Apple i tablet",
      },
    ],
    orderId: `${Math.round(Math.random() * 100000)}`,
    status: "Pending",
    total: 240,
    dateAdded: "26/01/2023",
    dateModified: "03/03/2023",
  },
  {
    key: `${Math.round(Math.random() * 100000)}`,
    customer: {
      customerContact: "+16 89 899000999",
      customerEmail: "marcusrashford@email",
      customerImage: `/assets/images/man.jpg`,
      customerName: "Marcus Rashford",
    },
    shippingAddress:
      "Unit 1/23 Hastings Road, Melbourne 3000, London, Australia.",
    paymentAddress:
      "Unit 1/23 Hastings Road, Melbourne 3000, Manchester, Australia.",
    invoice: "#INV-000415",
    products: [
      {
        date: "03/07/2023",
        productId: `${Math.round(Math.random() * 100000)}`,
        productImage: "/assets/images/newlook.jpg",
        qty: 1,
        unitCost: 22,
        productName: "Apple i phohe",
      },
      {
        date: "03/07/2023",
        productId: `${Math.round(Math.random() * 100000)}`,
        productImage: "/assets/images/newlook.jpg",
        qty: 1,
        unitCost: 22,
        productName: "Apple i tablet",
      },
    ],
    orderId: `${Math.round(Math.random() * 100000)}`,
    status: "Refunded",
    total: 240,
    dateAdded: "26/01/2023",
    dateModified: "03/03/2023",
  },
];

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    deleteOrder: (state, action: PayloadAction<string>) => {
      const orderId = action.payload;
      const newState = state.filter(
        (order: OrdersProps) => order.orderId !== orderId
      );

      return newState;
    },
  },
});

export const { deleteOrder } = orderSlice.actions;

export default orderSlice;
