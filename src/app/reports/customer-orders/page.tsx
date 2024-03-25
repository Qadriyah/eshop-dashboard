"use client";

import React from "react";
import Card from "@/components/Card";
import { formatCurrency } from "@/utils/helpers";
import { Table, TableProps } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import PageHeader from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import {
  getCustomerSalesReport,
  getReturnsReport,
} from "@/api/actions/reports";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import DownloadCsv from "@/components/DownloadCsv";
import { CustomerSalesReport } from "@/types/entities";

const { RangePicker } = DatePicker;
const columns: TableProps<CustomerSalesReport>["columns"] = [
  {
    key: "email",
    dataIndex: "email",
    title: "Email",
    className: "text-[1.063rem]",
    render: (_, item) => <div>{item.email}</div>,
  },
  {
    key: "name",
    dataIndex: "name",
    title: "Full Name",
    className: "text-[1.063rem]",
    render: (_, item) => (
      <div className="opacity-70 hover:text-[#3875d7]">{item.fullName}</div>
    ),
  },
  {
    key: "status",
    dataIndex: "status",
    title: "Status",
    className: "text-[1.063rem]",
    render: (_, item) => (
      <div
        className={`border px-2 rounded-md ${
          item.status === "Active"
            ? "bg-green-200 text-green-600 border-green-600"
            : "bg-red-200 text-red-600 border-red-600"
        }`}
      >
        {item.status}
      </div>
    ),
  },
  {
    key: "date",
    dataIndex: "date",
    title: "Date Joined",
    className: "text-[1.063rem]",
    render: (_, item) => (
      <div className="opacity-70">
        {moment(item.createdAt).format("MM/DD/YYYY")}
      </div>
    ),
  },
  {
    key: "orders",
    dataIndex: "orders",
    title: "No. of Orders",
    className: "text-[1.063rem]",
    align: "center",
    render: (_, item) => <div className="opacity-70">{item.orders}</div>,
  },
  {
    key: "products",
    dataIndex: "products",
    title: "No. of Products",
    className: "text-[1.063rem]",
    align: "center",
    render: (_, item) => <div className="opacity-70">{item.products}</div>,
  },
  {
    key: "total",
    dataIndex: "total",
    title: "Total",
    className: "text-[1.063rem]",
    align: "right",
    render: (_, item) => (
      <div className="opacity-70">{formatCurrency(item.total)}</div>
    ),
  },
];

const csvColumns = [
  {
    id: "email",
    displayName: "Email",
  },
  {
    id: "name",
    displayName: "Full Name",
  },
  {
    id: "status",
    displayName: "Status",
  },
  {
    id: "date",
    displayName: "Date Joined",
  },
  {
    id: "orders",
    displayName: "No. of Order",
  },
  {
    id: "products",
    displayName: "No.of Products",
  },
  {
    id: "total",
    displayName: "Total",
  },
];

const CustomerOrders: React.FC<{}> = (): JSX.Element => {
  const [dateValue, setDateValue] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ["customer-sales-report", dateValue],
    queryFn: () => getCustomerSalesReport(dateValue[0], dateValue[1]),
    enabled: dateValue.length > 0,
  });

  const getDateValue = (date: string[]) => setDateValue(date);

  return (
    <div>
      <PageHeader title="Customer Orders Report" />
      <Card>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-40">
              <Loader color="black" />
            </div>
          }
          loading={isLoading}
        >
          <Space direction="vertical" size={20} className="w-full">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1">
                <div>
                  <RangePicker
                    defaultValue={[dayjs(dateValue[0]), dayjs(dateValue[1])]}
                    onChange={(_, dates) => getDateValue(dates)}
                    className="p-2 text-[1.063rem]"
                  />
                </div>
              </div>
              <div>
                <DownloadCsv
                  filename="customer-orders"
                  columns={csvColumns}
                  data={data?.report!}
                />
              </div>
            </div>
            <div className="overflow-x-scroll hide-scrollbar w-full">
              <div className="min-w-[800px] hide-scrollbar">
                <Table columns={columns} dataSource={data?.report} />
              </div>
            </div>
          </Space>
        </Suspense>
      </Card>
    </div>
  );
};

export default CustomerOrders;
