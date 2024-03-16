import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CustomerProps = {
  key: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  id: number;
  image: string;
};

const initialState: CustomerProps[] = [
  {
    key: `${Math.round(Math.random() * 1000000)}`,
    name: "Francis Mitchman",
    id: Math.round(Math.random() * 1000000),
    email: "francismitchman@email.com",
    status: "Active",
    createdAt: "22 Sep 2023, 11:30 am",
    image: "/assets/images/man.jpg",
  },
  {
    key: `${Math.round(Math.random() * 1000000)}`,
    name: "Marcus Thuram",
    id: Math.round(Math.random() * 1000000),
    email: "marcusthuram10@email.com",
    status: "Locked",
    createdAt: "22 Sep 2023, 11:30 am",
    image: "/assets/images/photo.jpeg",
  },
  {
    key: `${Math.round(Math.random() * 1000000)}`,
    name: "David De Gea",
    id: Math.round(Math.random() * 1000000),
    email: "davedegea1@email.com",
    status: "Active",
    createdAt: "22 Sep 2023, 11:30 am",
    image: "/assets/images/girl-fashion.jpg",
  },
];

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    deleteCustomer: (state, action: PayloadAction<number>) => {
      const newCustomers = state.filter(
        (customer) => customer.id !== action.payload
      );

      return newCustomers;
    },
  },
});

export const { deleteCustomer } = customerSlice.actions;

export default customerSlice;
