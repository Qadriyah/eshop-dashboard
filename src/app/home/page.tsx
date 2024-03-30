import PageHeader from "@/components/PageHeader";
import React from "react";
import OrdersThisMonth from "./OrdersThisMonth";
import NewCustomers from "./NewCustomers";
import ProductEarnings from "./ProductEarnings";
import DailySales from "./DailySales";
import MonthlySales from "./MonthlySales";
import TopSelling from "./TopSelling";
import ProductOrders from "./ProductOrders";

const Home = () => {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="grid grid-cols-1 gap-5 md:min-[1024px]:grid-cols-2">
          <OrdersThisMonth />
          <ProductEarnings />
          <NewCustomers />
          <DailySales />
        </div>
        <div className="">
          <MonthlySales />
        </div>
      </div>
      <div className="flex gap-5 mt-5 flex-col xl:flex-row">
        <div className="flex-[0.8]">
          <TopSelling />
        </div>
        <div className="flex-1">
          <ProductOrders />
        </div>
      </div>
    </div>
  );
};

export default Home;
