"use client";
import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Card from "@/components/Card";
import { GoDotFill } from "react-icons/go";
import { formatCurrency } from "@/utils/helpers";

const data = [
  { name: "Turmeric Soap", value: 400, color: "#0088FE" },
  { name: "Turmeric Cleanser", value: 300, color: "#00C49F" },
  { name: "Slim Sip Detox", value: 300, color: "#FFBB28" },
];

const ProductOrders = () => {
  return (
    <Card>
      <div className="h-[200px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-5">
            <div className="text-4xl">
              <sup className="opacity-45 text-xl">$</sup> 1,000
            </div>
            <div className="flex items-center text-sm px-1 bg-green-200 text-green-600 rounded-md">
              <FaArrowUp />
              <span>2.2%</span>
            </div>
          </div>
          <div className="text-sm opacity-45">Product Earnings</div>
        </div>
        <div className="flex items-center">
          <div className="h-[150px] w-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={150} height={150}>
                <Pie
                  data={data}
                  innerRadius={30}
                  outerRadius={40}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div>
                  <GoDotFill color={item.color} />
                </div>
                <div className="text-sm opacity-45 flex-1">{item.name}</div>
                <div>{formatCurrency(item.value)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductOrders;
