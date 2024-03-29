import PageHeader from "@/components/PageHeader";
import React from "react";
import OrdersThisMonth from "./OrdersThisMonth";
import NewCustomers from "./NewCustomers";
import ProductOrders from "./ProductOrders";
import DailySales from "./DailySales";

const Home = () => {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="grid grid-cols-1 gap-5 md:min-[1024px]:grid-cols-2">
          <OrdersThisMonth />
          <ProductOrders />
          <NewCustomers />
          <DailySales />
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Home;
