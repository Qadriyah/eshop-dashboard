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
import { getSalesReport } from "@/api/actions/reports";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import DownloadCsv from "@/components/DownloadCsv";
import { SaleReport } from "@/types/entities";
import { useReactToPrint } from "react-to-print";
import Button from "@/components/Button";
import { FiPrinter } from "react-icons/fi";
import ReportHeader from "../_components/ReportHeader";
import SalesSummary from "../_components/SalesSummary";

const { RangePicker } = DatePicker;
const columns: TableProps<SaleReport>["columns"] = [
  {
    key: "date",
    dataIndex: "date",
    title: "Date",
    className: "text-[1.063rem]",
    render: (_, item) => <div>{moment(item.date).format("MM/DD/YYYY")}</div>,
  },
  {
    key: "no_orders",
    dataIndex: "orders",
    title: "No. Orders",
    className: "text-[1.063rem]",
    align: "center",
    render: (_, item) => (
      <div className="opacity-70 hover:text-[#3875d7]">{item.orders}</div>
    ),
  },
  {
    key: "products_sold",
    dataIndex: "sold",
    title: "Products Sold",
    className: "text-[1.063rem]",
    align: "center",
    render: (_, item) => <div className="opacity-70">{item.sold}</div>,
  },
  {
    key: "tax",
    dataIndex: "tax",
    title: "Tax",
    className: "text-[1.063rem]",
    align: "right",
    render: (_, item) => (
      <div className="opacity-70">{formatCurrency(item.tax)}</div>
    ),
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
    id: "date",
    displayName: "Date",
  },
  {
    id: "orders",
    displayName: "No. of Orders",
  },
  {
    id: "sold",
    displayName: "Products Sold",
  },
  {
    id: "tax",
    displayName: "Tax",
  },
  {
    id: "total",
    displayName: "Total",
  },
];

const calculateTotals = (
  data: SaleReport[]
): {
  totalAmount: number;
  totalProducts: number;
  totalOrders: number;
  totalTax: number;
} => {
  let totalOrders = 0;
  let totalProducts = 0;
  let totalTax = 0;
  let totalAmount = 0;
  data?.forEach((item) => {
    totalOrders += item.orders;
    totalProducts += item.sold;
    totalTax = item.tax ? totalTax + item.tax : totalTax + 0;
    totalAmount = item.total ? totalAmount + item.total : totalAmount + 0;
  });
  return { totalAmount, totalProducts, totalOrders, totalTax };
};

const Sales: React.FC<{}> = (): JSX.Element => {
  const reportRef = React.useRef<HTMLDivElement>(null);
  const [dateValue, setDateValue] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ["sales-report", dateValue],
    queryFn: () => getSalesReport(dateValue[0], dateValue[1]),
    enabled: dateValue.length > 0,
  });

  const getDateValue = (date: string[]) => setDateValue(date);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current!,
  });

  const { totalOrders, totalProducts, totalTax, totalAmount } = React.useMemo(
    () => calculateTotals(data?.report!),
    [data?.report]
  );

  return (
    <div>
      <PageHeader title="Sales Report" />
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
                  filename="sales"
                  columns={csvColumns}
                  data={data?.report!}
                />
              </div>
            </div>
            <div
              className="overflow-x-scroll hide-scrollbar w-full page-break"
              ref={reportRef}
            >
              <ReportHeader
                title="Sales Report"
                startDate={dateValue[0]}
                endDate={dateValue[1]}
              />
              <div className="min-w-[800px] hide-scrollbar">
                <Table
                  columns={columns}
                  dataSource={data?.report}
                  pagination={false}
                  summary={() => (
                    <SalesSummary
                      totalOrders={totalOrders || 0}
                      totalAmount={totalAmount || 0}
                      totalProducts={totalProducts || 0}
                      totalTax={totalTax || 0}
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

export default Sales;
