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
import { getCustomerSalesReport } from "@/api/actions/reports";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import DownloadCsv from "@/components/DownloadCsv";
import { CustomerSalesReport } from "@/types/entities";
import { useReactToPrint } from "react-to-print";
import ReportHeader from "../ReportHeader";
import Button from "@/components/Button";
import { FiPrinter } from "react-icons/fi";
import ReportSummary from "./ReportSummary";

const { RangePicker } = DatePicker;
const columns: TableProps<CustomerSalesReport>["columns"] = [
  {
    key: "email",
    dataIndex: "email",
    title: "Email",
    className: "text-[1.063rem] print:text-[0.75rem]",
    render: (_, item) => <div>{item.email}</div>,
  },
  {
    key: "name",
    dataIndex: "name",
    title: "Name",
    className: "text-[1.063rem] print:text-[0.75rem]",
    render: (_, item) => (
      <div className="opacity-70 hover:text-[#3875d7]">{item.fullName}</div>
    ),
  },
  {
    key: "status",
    dataIndex: "status",
    title: "Status",
    className: "text-[1.063rem] print:text-[0.75rem]",
    render: (_, item) => (
      <div
        className={`border px-1 rounded-md text-center ${
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
    title: "Joined",
    className: "text-[1.063rem] print:text-[0.75rem]",
    render: (_, item) => (
      <div className="opacity-70">
        {moment(item.createdAt).format("MM/DD/YYYY")}
      </div>
    ),
  },
  {
    key: "orders",
    dataIndex: "orders",
    title: "Orders#",
    className: "text-[1.063rem] print:text-[0.75rem]",
    align: "center",
    render: (_, item) => <div className="opacity-70">{item.orders}</div>,
  },
  {
    key: "products",
    dataIndex: "products",
    title: "Products#",
    className: "text-[1.063rem] print:text-[0.75rem]",
    align: "center",
    render: (_, item) => <div className="opacity-70">{item.products}</div>,
  },
  {
    key: "total",
    dataIndex: "total",
    title: "Total",
    className: "text-[1.063rem] print:text-[0.75rem]",
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

const calculateTotals = (
  data: CustomerSalesReport[]
): { totalOrders: number; totalProducts: number; totalSales: number } => {
  let totalSales = 0;
  let totalProducts = 0;
  let totalOrders = 0;
  data?.forEach((item) => {
    totalSales = item.total ? totalSales + item.total : totalSales + 0;
    totalProducts += item.products;
    totalOrders += item.orders;
  });
  return { totalOrders, totalProducts, totalSales };
};

const CustomerOrders: React.FC<{}> = (): JSX.Element => {
  const reportRef = React.useRef<HTMLDivElement>(null);
  const [dateValue, setDateValue] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ["customer-sales-report", dateValue],
    queryFn: () => getCustomerSalesReport(dateValue[0], dateValue[1]),
    enabled: dateValue.length > 0,
  });

  const { totalSales, totalOrders, totalProducts } = React.useMemo(
    () => calculateTotals(data?.report!),
    [data?.report]
  );

  const getDateValue = (date: string[]) => setDateValue(date);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current!,
  });

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
                <Button
                  className="border border-blue-600 text-blue-600 bg-white p-[6px] rounded-md hover:bg-blue-200"
                  onClick={handlePrint}
                >
                  <FiPrinter size={25} />
                </Button>
              </div>
              <div>
                <DownloadCsv
                  filename="customer-orders"
                  columns={csvColumns}
                  data={
                    data?.report?.map((item) => ({
                      ...item,
                      name: item.fullName,
                      date: moment(item.createdAt).format("MM/DD/YYYY"),
                    }))!
                  }
                />
              </div>
            </div>
            <div
              className="overflow-x-scroll hide-scrollbar w-full page-break"
              ref={reportRef}
            >
              <ReportHeader
                title="Customer Sales Report"
                startDate={dateValue[0]}
                endDate={dateValue[1]}
              />
              <div className="min-w-[800px] hide-scrollbar">
                <Table
                  columns={columns}
                  dataSource={data?.report}
                  pagination={false}
                  summary={() => (
                    <ReportSummary
                      totalSales={totalSales || 0}
                      totalOrders={totalOrders || 0}
                      totalProducts={totalProducts || 0}
                    />
                  )}
                />
              </div>
            </div>
          </Space>
        </Suspense>
      </Card>
    </div>
  );
};

export default CustomerOrders;
