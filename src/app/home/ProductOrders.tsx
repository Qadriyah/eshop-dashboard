"use client";
import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import Card from "@/components/Card";

const { RangePicker } = DatePicker;

const ProductOrders = () => {
  const [dateValue, setDateValue] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);

  return (
    <Card>
      <div className="h-[458px] flex flex-col gap-3 justify-between">
        <div className="flex gap-5">
          <div className="flex-1">
            <div className="text-xl">Product Orders</div>
            <div className="text-sm opacity-45">Avg. 52 orders per day</div>
          </div>
          <div>
            <RangePicker
              defaultValue={[dayjs(dateValue[0]), dayjs(dateValue[1])]}
              onChange={(_, dates) => setDateValue(dates)}
              className="p-2 text-[1.063rem]"
            />
          </div>
        </div>
        <div>
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
            {/* <ResponsiveContainer width="100%" height="100%">
              
            </ResponsiveContainer> */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductOrders;
