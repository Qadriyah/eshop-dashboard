"use client";
import React from "react";
import moment from "moment";
import PageHeader from "@/components/PageHeader";
import OrdersThisMonth from "./_components/OrdersThisMonth";
import NewCustomers from "./_components/NewCustomers";
import ProductEarnings from "./_components/ProductEarnings";
import DailySales from "./_components/DailySales";
import MonthlySales from "./_components/MonthlySales";
import TopSelling from "./_components/TopSelling";
import ProductOrders from "./_components/ProductOrders";
import { useQuery } from "@tanstack/react-query";
import { getCompletedSalesReport } from "@/api/actions/reports";

const Home = () => {
  const [currentMonth] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);
  const [prevMonth] = React.useState<string[]>([
    moment().subtract(1, "M").startOf("M").format("YYYY-MM-DD"),
    moment().subtract(1, "M").endOf("M").format("YYYY-MM-DD"),
  ]);

  const { data: currentSales, isLoading } = useQuery({
    queryKey: ["current-orders"],
    queryFn: () =>
      getCompletedSalesReport({
        from: currentMonth[0],
        to: currentMonth[1],
      }),
  });

  const { data: prevSales } = useQuery({
    queryKey: ["prev-orders"],
    queryFn: () =>
      getCompletedSalesReport({
        from: prevMonth[0],
        to: prevMonth[1],
      }),
  });

  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="grid grid-cols-1 gap-5 md:min-[1024px]:grid-cols-2">
          <OrdersThisMonth
            currentSales={currentSales?.sales || []}
            prevSales={prevSales?.sales || []}
          />
          <ProductEarnings currentSales={currentSales?.sales || []} />
          <NewCustomers />
          <DailySales />
        </div>
        <div className="">
          <MonthlySales />
        </div>
      </div>
      <div className="flex gap-5 mt-5 flex-col xl:flex-row">
        <div className="flex-[0.5]">
          <TopSelling />
        </div>
        <div className="flex-1 overflow-x-scroll">
          <ProductOrders />
        </div>
      </div>
    </div>
  );
};

export default Home;
