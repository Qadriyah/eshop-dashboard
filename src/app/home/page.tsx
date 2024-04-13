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
import Suspense from "@/components/Suspense";
import OrdersThisMonthLoader from "./_components/_loaders/OrdersThisMonthLoader";
import ProductOrdersLoader from "./_components/_loaders/ProductOrdersLoader";
import DailySalesLoader from "./_components/_loaders/DailySalesLoader";
import TopSellingLoader from "./_components/_loaders/TopSellingLoader";
import { useIsVisible } from "@/hooks";

const Home = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [currentMonth] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);
  const [prevMonth] = React.useState<string[]>([
    moment().subtract(1, "M").startOf("M").format("YYYY-MM-DD"),
    moment().subtract(1, "M").endOf("M").format("YYYY-MM-DD"),
  ]);

  const isVisible = useIsVisible(ref);

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
        <div className="grid grid-cols-1 gap-5">
          <Suspense fallback={<OrdersThisMonthLoader />} loading={isLoading}>
            <OrdersThisMonth
              currentSales={currentSales?.sales || []}
              prevSales={prevSales?.sales || []}
            />
          </Suspense>
          <Suspense fallback={<ProductOrdersLoader />} loading={isLoading}>
            <ProductEarnings currentSales={currentSales?.sales || []} />
          </Suspense>
          <NewCustomers />
          <Suspense fallback={<DailySalesLoader />} loading={isLoading}>
            <DailySales
              currentSales={currentSales?.sales || []}
              date={currentMonth[0]}
            />
          </Suspense>
        </div>
        <div className="flex flex-col gap-5">
          <MonthlySales />
          <Suspense fallback={<TopSellingLoader />} loading={isLoading}>
            <TopSelling currentSales={currentSales?.sales || []} />
          </Suspense>
        </div>
      </div>
      <div className="flex gap-5 mt-5 flex-col xl:flex-row">
        <div className="flex-1 overflow-x-scroll" ref={ref}>
          <ProductOrders isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
};

export default Home;
