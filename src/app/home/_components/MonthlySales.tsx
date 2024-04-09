"use client";
import React from "react";
import moment from "moment";
import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import { getCompletedSalesReport } from "@/api/actions/reports";
import { getDailySales } from "./helpers";
import { GoDotFill } from "react-icons/go";
import { formatCurrency } from "@/utils/helpers";
import { NumericFormat } from "react-number-format";
import Suspense from "@/components/Suspense";
import MonthlySalesLoader from "./_loaders/MonthlySalesLoader";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white rounded-sm border border-gray-300 p-2 text-sm">
        <p className="mb-2">{payload[0].payload.day}</p>
        <div className="flex items-center">
          <GoDotFill size={24} color={payload[0].fill} />
          <p className="mr-3">Sales:</p>
          <p>{`${formatCurrency(payload[0].payload.total)}`}</p>
        </div>
      </div>
    );
  }

  return null;
};

const MonthlySales = () => {
  const [dateValue, setDateValue] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    setDateValue(() => [
      date.startOf("M").format("YYYY-MM-DD"),
      date.endOf("M").format("YYYY-MM-DD"),
    ]);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["monthly-sales", dateValue],
    queryFn: () =>
      getCompletedSalesReport({
        from: dateValue[0],
        to: dateValue[1],
      }),
  });

  const { sales, total } = React.useMemo(
    () => getDailySales(data?.sales || [], dateValue[0]),
    [data?.sales, dateValue]
  );

  return (
    <Suspense fallback={<MonthlySalesLoader />} loading={isLoading}>
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
              <DatePicker
                defaultValue={dayjs(dateValue[0])}
                onChange={onChangeDate}
                picker="month"
                className="p-2 pl-5"
              />
            </div>
          </div>
          <div className="my-5">
            <div className="flex items-center gap-5">
              <div className="text-4xl">
                <sup className="opacity-45 text-xl">$</sup>{" "}
                <NumericFormat
                  value={total}
                  thousandSeparator=","
                  displayType="text"
                />
              </div>
              <div className="flex items-center text-sm px-1 bg-green-200 text-green-600 rounded-md"></div>
            </div>
            <div className="text-sm opacity-45">Monthly Sales value</div>
          </div>
          <div className="flex items-center">
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart
                  width={500}
                  height={200}
                  data={sales}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>
    </Suspense>
  );
};

export default MonthlySales;
