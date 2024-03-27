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
import { getProductSalesReport } from "@/api/actions/reports";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import DownloadCsv from "@/components/DownloadCsv";
import { ProductReport } from "@/types/entities";
import { useReactToPrint } from "react-to-print";
import ReportHeader from "../ReportHeader";
import Button from "@/components/Button";
import { FiPrinter } from "react-icons/fi";
import ReportSummary from "./ReportSummary";

const { RangePicker } = DatePicker;
const columns: TableProps<ProductReport>["columns"] = [
  {
    key: "name",
    dataIndex: "name",
    title: "Product Name",
    className: "text-[1.063rem]",
    render: (_, item) => <div>{item.name}</div>,
  },
  {
    key: "sold",
    dataIndex: "sold",
    title: "Quantity Sold",
    className: "text-[1.063rem]",
    align: "center",
    render: (_, item) => (
      <div className="opacity-70 hover:text-[#3875d7]">{item.sold}</div>
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
    id: "name",
    displayName: "Product Name",
  },
  {
    id: "sold",
    displayName: "Quantity Sold",
  },
  {
    id: "total",
    displayName: "Total",
  },
];

const calculateTotals = (
  data: ProductReport[]
): { totalAmount: number; totalSold: number } => {
  let totalSold = 0;
  let totalAmount = 0;
  data?.forEach((item) => {
    totalSold += item.sold;
    totalAmount += item.total;
  });
  return { totalAmount, totalSold };
};

const ProductsReport: React.FC<{}> = (): JSX.Element => {
  const reportRef = React.useRef<HTMLDivElement>(null);
  const [dateValue, setDateValue] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ["products-report", dateValue],
    queryFn: () => getProductSalesReport(dateValue[0], dateValue[1]),
    enabled: dateValue.length > 0,
  });

  const getDateValue = (date: string[]) => setDateValue(date);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current!,
  });

  const { totalSold, totalAmount } = React.useMemo(
    () => calculateTotals(data?.report!),
    [data?.report]
  );

  return (
    <div>
      <PageHeader title="Product Sales Report" />
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
                  filename="returns"
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
                title="Product Sales Report"
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
                      totalSold={totalSold || 0}
                      totalAmount={totalAmount || 0}
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

export default ProductsReport;
