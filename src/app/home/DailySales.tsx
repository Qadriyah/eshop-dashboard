"use client";
import React from "react";
import { FaArrowUp } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/Card";

const data = [
  {
    day: "Feb 1",
    sales: 10,
    amt: 2400,
  },
  {
    day: "Feb 2",
    sales: 15,
    amt: 2210,
  },
  {
    day: "Feb 3",
    sales: 70,
    amt: 2290,
  },
  {
    day: "Feb 4",
    sales: 20,
    amt: 2000,
  },
  {
    day: "Feb 5",
    sales: 9,
    amt: 2181,
  },
  {
    day: "Feb 6",
    sales: 30,
    amt: 2500,
  },
  {
    day: "Feb 7",
    sales: 50,
    amt: 2100,
  },
];

const DailySales = () => {
  return (
    <Card>
      <div className="h-[200px] flex flex-col gap-3 justify-between">
        <div>
          <div className="flex items-center gap-5">
            <div className="text-4xl">
              <sup className="opacity-45 text-xl">$</sup> 2,400
            </div>
            <div className="flex items-center text-sm px-1 bg-green-200 text-green-600 rounded-md">
              <FaArrowUp />
              <span>2.7%</span>
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
                data={data}
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
                <Tooltip />
                <Legend />
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
