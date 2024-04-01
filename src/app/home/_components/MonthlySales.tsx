"use client";
import React from "react";
import moment from "moment";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/Card";
import { randomNumber } from "@/utils/helpers";

const { RangePicker } = DatePicker;
const data = Array.from({ length: 30 }, (_, index) => ({
  name: `Mar ${index + 1}`,
  uv: randomNumber(100, 2000),
  pv: randomNumber(100, 2000),
  amt: randomNumber(100, 2000),
}));

const MonthlySales = () => {
  const [dateValue, setDateValue] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);

  return (
    <Card>
      <div className="h-[458px] flex flex-col gap-3">
        <div className="flex gap-5">
          <div className="flex-1">
            <div className="text-xl">Monthly Sales</div>
            <div className="text-sm opacity-45">
              Customers from all channels
            </div>
          </div>
          <div>
            <RangePicker
              defaultValue={[dayjs(dateValue[0]), dayjs(dateValue[1])]}
              onChange={(_, dates) => setDateValue(dates)}
              className="p-2 text-[1.063rem]"
            />
          </div>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-5">
            <div className="text-4xl">
              <sup className="opacity-45 text-xl">$</sup> 2,400
            </div>
            <div className="flex items-center text-sm px-1 bg-green-200 text-green-600 rounded-md"></div>
          </div>
          <div className="text-sm opacity-45">Average Daily Sales</div>
        </div>
        <div className="flex items-center">
          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                width={500}
                height={200}
                data={data}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MonthlySales;
