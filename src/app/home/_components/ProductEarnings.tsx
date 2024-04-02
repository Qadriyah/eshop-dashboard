"use client";
import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Card from "@/components/Card";
import { GoDotFill } from "react-icons/go";
import { formatCurrency, generateColor } from "@/utils/helpers";
import { SaleType } from "@/types/entities";
import { getProductEarnings } from "./helpers";
import { NumericFormat } from "react-number-format";

type IProps = {
  currentSales: SaleType[];
};

const ProductEarnings: React.FC<IProps> = ({ currentSales }) => {
  const earnings = getProductEarnings(currentSales);
  const pieData = earnings.earnings.map((item) => ({
    name: item.name,
    value: item.total,
    color: generateColor(),
  }));

  return (
    <Card>
      <div className="h-[200px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-5">
            <div className="text-4xl">
              <sup className="opacity-45 text-xl">$</sup>{" "}
              <NumericFormat
                value={earnings.total}
                displayType="text"
                thousandSeparator=","
              />
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
                  data={pieData}
                  innerRadius={30}
                  outerRadius={40}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div>
                  <GoDotFill color={item.color} />
                </div>
                <div className="text-xs opacity-45 flex-1">{item.name}</div>
                <div className="text-sm">{formatCurrency(item.value)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductEarnings;
