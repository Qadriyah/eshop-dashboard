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

const data = [
  {
    product: "Turmeric Soap",
    sales: 1000,
    amt: 2400,
  },
  {
    product: "Turmeric Cleanser",
    sales: 650,
    amt: 2210,
  },
  {
    product: "Slim Sip Detox",
    sales: 400,
    amt: 2290,
  },
];

const TopSelling = () => {
  const [isLarge, setIsLarge] = React.useState(true);

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
              height={400}
              data={data}
              margin={{
                top: 0,
                right: 20,
                bottom: 0,
                left: 0,
              }}
            >
              <XAxis type="number" />
              <YAxis
                dataKey="product"
                type="category"
                scale="auto"
                width={200}
              />
              <Tooltip />
              <Bar dataKey="sales" barSize={20} fill="#413ea0" />
            </ComposedChart>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                layout="vertical"
                width={300}
                height={400}
                data={data}
                margin={{
                  top: 0,
                  right: 20,
                  bottom: 0,
                  left: 0,
                }}
              >
                <XAxis type="number" />
                <YAxis
                  dataKey="product"
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
