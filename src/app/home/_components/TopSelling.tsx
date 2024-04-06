"use client";
import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";
import Card from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/actions/product";
import { SaleType } from "@/types/entities";
import { topSellingProduct } from "./helpers";
import { PRODUCT_STATUS } from "@/utils/constants";

type IProps = {
  currentSales: SaleType[];
};

const TopSelling: React.FC<IProps> = ({ currentSales }) => {
  const [isLarge, setIsLarge] = React.useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ status: PRODUCT_STATUS.active }),
  });

  const productSales = React.useMemo(
    () => topSellingProduct(data?.products || [], currentSales),
    [currentSales, data?.products]
  );

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1280) {
        setIsLarge(false);
      } else {
        setIsLarge(true);
      }
    });
    return () => window.removeEventListener("resize", () => {});
  }, []);

  React.useEffect(() => {
    if (window.innerWidth < 1280) {
      setIsLarge(false);
    } else {
      setIsLarge(true);
    }
  }, []);

  return (
    <Card>
      <div className="h-[458px] flex flex-col gap-3 justify-between">
        <div>
          <div className="text-xl">Top Selling Products</div>
          <div className="text-sm opacity-45">8k Customers</div>
        </div>
        <div className="w-full">
          {isLarge ? (
            <ComposedChart
              layout="vertical"
              width={300}
              height={350}
              data={productSales}
              margin={{
                top: 0,
                right: 20,
                bottom: 0,
                left: 0,
              }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" scale="auto" width={200} />
              <Tooltip />
              <Bar dataKey="sales" barSize={20} fill="#413ea0" />
            </ComposedChart>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart
                layout="vertical"
                width={300}
                height={400}
                data={productSales}
                margin={{
                  top: 0,
                  right: 20,
                  bottom: 0,
                  left: 0,
                }}
              >
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  scale="auto"
                  width={200}
                />
                <Tooltip />
                <Bar dataKey="sales" barSize={20} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TopSelling;
