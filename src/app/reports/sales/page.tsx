"use client";

import React from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { formatCurrency } from "@/utils/helpers";
import { Table, TableProps } from "antd";
import { BsDownload } from "react-icons/bs";
import CsvDownloader from "react-csv-downloader";
import moment from "moment";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import PageHeader from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { getSalesReport } from "@/api/actions/reports";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";

const { RangePicker } = DatePicker;
const columns: TableProps["columns"] = [
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

const Sales: React.FC<{}> = (): JSX.Element => {
  const [dateValue, setDateValue] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ["sales-report"],
    queryFn: () => getSalesReport(dateValue[0], dateValue[1]),
    enabled: dateValue.length > 0,
  });

  const getDateValue = (date: string[]) => setDateValue(date);

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
                <CsvDownloader
                  filename="myfile"
                  extension=".csv"
                  separator=","
                  wrapColumnChar=""
                  columns={csvColumns}
                  datas={data?.report as any}
                >
                  <Button className="font-semibold rounded-md p-2 text-[dodgerblue] bg-[#e3f2f7]">
                    <BsDownload className="mr-1 text-[dodgerblue] font-bold mt-1" />{" "}
                    Export Report
                  </Button>
                </CsvDownloader>
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

export default Sales;
