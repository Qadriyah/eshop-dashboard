import { createSlice } from "@reduxjs/toolkit";

// sales
type SalesProps = {
  reportId: string;
  key?: string;
  date: string;
  numberOfOrders: number;
  productsSold: number;
  tax: number;
  total: number;
};
// returns
type ReturnsProps = {
  key: string;
  returnsId: string;
  date: string;
  noOrdersReturned: number;
  noOrdersRefuned: number;
  noOrdersReplaced: number;
  totalRefunded: number;
  totalReplaced: number;
};
// customer orders
type CustomerOrder = {
  key: string;
  orderId: string;
  customerName: string;
  email: string;
  status: string;
  datesJoined: string;
  noOrders: number;
  noProducts: number;
  total: number;
};

type ReportProps = {
  sales: SalesProps[];
  customerOrders: CustomerOrder[];
  returns: ReturnsProps[];
};

const initialState: ReportProps = {
  sales: [
    {
      key: `${Math.round(Math.random() * 10000)}`,
      reportId: `${Math.round(Math.random() * 10000)}`,
      date: "2019-03-30",
      numberOfOrders: 20,
      productsSold: 100,
      tax: 10,
      total: 65,
    },
    {
      key: `${Math.round(Math.random() * 10000)}`,
      reportId: `${Math.round(Math.random() * 10000)}`,
      date: "2023-01-24",
      numberOfOrders: 18,
      productsSold: 92,
      tax: 10,
      total: 65,
    },
    {
      key: `${Math.round(Math.random() * 10000)}`,
      reportId: `${Math.round(Math.random() * 10000)}`,
      date: "2020-10-01",
      numberOfOrders: 8,
      productsSold: 12,
      tax: 10,
      total: 65,
    },
  ],
  customerOrders: [
    {
      key: `${Math.round(Math.random() * 10000)}`,
      customerName: "Harry Potter",
      email: "harrypotter@email.com",
      status: "Locked",
      datesJoined: "2019-11-10",
      noOrders: 27,
      noProducts: 20,
      total: 1768,
      orderId: `${Math.round(Math.random() * 10000)}`,
    },
    {
      key: `${Math.round(Math.random() * 10000)}`,
      customerName: "Emma Smith",
      email: "emmasmith@email.com",
      status: "Active",
      datesJoined: "2023-10-20",
      noOrders: 27,
      noProducts: 40,
      total: 1768,
      orderId: `${Math.round(Math.random() * 10000)}`,
    },
    {
      key: `${Math.round(Math.random() * 10000)}`,
      customerName: "Angel Di Maria",
      email: "adimaria22@email.com",
      status: "Banned",
      datesJoined: "2022-02-04",
      noOrders: 27,
      noProducts: 40,
      total: 1768,
      orderId: `${Math.round(Math.random() * 10000)}`,
    },
  ],
  returns: [
    {
      key: `${Math.round(Math.random() * 10000)}`,
      date: "2023-09-23",
      noOrdersReturned: 2,
      noOrdersRefuned: 0,
      noOrdersReplaced: 2,
      totalRefunded: 0,
      totalReplaced: 45,
      returnsId: `${Math.round(Math.random() * 10000)}`,
    },
    {
      key: `${Math.round(Math.random() * 10000)}`,
      date: "2023-04-25",
      noOrdersReturned: 2,
      noOrdersRefuned: 0,
      noOrdersReplaced: 5,
      totalRefunded: 0,
      totalReplaced: 40,
      returnsId: `${Math.round(Math.random() * 10000)}`,
    },
    {
      key: `${Math.round(Math.random() * 10000)}`,
      date: "2023-09-22",
      noOrdersReturned: 1,
      noOrdersRefuned: 0,
      noOrdersReplaced: 2,
      totalRefunded: 0,
      totalReplaced: 48,
      returnsId: `${Math.round(Math.random() * 10000)}`,
    },
  ],
};

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
});

export default reportSlice;
