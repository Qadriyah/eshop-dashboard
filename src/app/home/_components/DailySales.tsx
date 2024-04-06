"use client";
import React from "react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowUp,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GoDotFill } from "react-icons/go";
import Card from "@/components/Card";
import { SaleType } from "@/types/entities";
import { getAverageDailySales, getDailySales } from "./helpers";
import { formatCurrency } from "@/utils/helpers";

type IProps = {
  currentSales: SaleType[];
  date: string;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white rounded-sm border border-gray-300 p-2 text-sm">
        <p className="mb-2">{payload[0].payload.day}</p>
        <div className="flex items-center">
          <GoDotFill size={24} color={payload[0].fill} />
          <p className="mr-3">Sales:</p>
          <p>{`${payload[0].payload.average}%`}</p>
        </div>
      </div>
    );
  }

  return null;
};

const DailySales: React.FC<IProps> = ({ currentSales, date }) => {
  const [startIndex, setStartIndex] = React.useState(0);
  const [stopIndex, setStopIndex] = React.useState(7);
  const [week, setWeek] = React.useState(1);
  const { sales } = getDailySales(currentSales, date);

  const onNext = () => {
    setStartIndex((prevState) => prevState + 7);
    setStopIndex((prevState) => prevState + 7);
    setWeek((prevState) => prevState + 1);
  };

  const onPrev = () => {
    setStartIndex((prevState) => prevState - 7);
    setStopIndex((prevState) => prevState - 7);
    setWeek((prevState) => prevState - 1);
  };

  const weeklySales = sales.slice(startIndex, stopIndex);
  const weeklyTotal = weeklySales.reduce(
    (total, sale) => total + sale.total,
    0
  );

  return (
    <Card>
      <div className="h-[200px] flex flex-col gap-3 justify-between">
        <div>
          <div className="flex items-center gap-5">
            <div className="text-4xl">
              <sup className="opacity-45 text-xl">$</sup>{" "}
              {formatCurrency(weeklyTotal)}
            </div>
            <div className="flex items-center text-sm px-1 bg-green-200 text-green-600 rounded-md">
              <FaArrowUp />
              <span>2.7%</span>
            </div>
            <div className="flex items-center gap-3 flex-1 justify-end">
              <FaArrowAltCircleLeft
                size={24}
                className={`cursor-pointer hover:text-blue-500 ${
                  startIndex === 0 && "pointer-events-none"
                }`}
                onClick={onPrev}
              />
              <div>{`Week ${week}`}</div>
              <FaArrowAltCircleRight
                size={24}
                className={`cursor-pointer hover:text-blue-500 ${
                  startIndex >= 28 && "pointer-events-none"
                }`}
                onClick={onNext}
              />
            </div>
          </div>
          <div className="text-sm opacity-45">Average Daily Sales</div>
        </div>
        <div className="flex items-center">
          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={700}
                height={300}
                data={weeklySales.map((sale) => ({
                  ...sale,
                  average: getAverageDailySales(sale.sales, weeklySales),
                }))}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
                barSize={10}
              >
                <XAxis
                  dataKey="day"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis dataKey="sales" />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="sales"
                  fill="#8884d8"
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DailySales;
