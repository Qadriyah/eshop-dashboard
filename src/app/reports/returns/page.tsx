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
import { getReturnsReport } from "@/api/actions/reports";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import DownloadCsv from "@/components/DownloadCsv";
import { ReturnsReport } from "@/types/entities";

const { RangePicker } = DatePicker;
const columns: TableProps<ReturnsReport>["columns"] = [
  {
    key: "date",
    dataIndex: "date",
    title: "Date",
    className: "text-[1.063rem]",
    render: (_, item) => <div>{moment(item.date).format("MM/DD/YYYY")}</div>,
  },
  {
    key: "no_orders",
    dataIndex: "returned",
    title: "No. of Orders Returned",
    className: "text-[1.063rem]",
    align: "center",
    render: (_, item) => (
      <div className="opacity-70 hover:text-[#3875d7]">{item.returned}</div>
    ),
  },
  {
    key: "products_sold",
    dataIndex: "refunded",
    title: "No. of Orders Refunded",
    className: "text-[1.063rem]",
    align: "center",
    render: (_, item) => <div className="opacity-70">{item.refunded}</div>,
  },
  {
    key: "total",
    dataIndex: "totalRefunded",
    title: "Total Refunded",
    className: "text-[1.063rem]",
    align: "right",
    render: (_, item) => (
      <div className="opacity-70">{formatCurrency(item.totalRefunded)}</div>
    ),
  },
];

const csvColumns = [
  {
    id: "date",
    displayName: "Date",
  },
  {
    id: "returned",
    displayName: "No. of Orders Returned",
  },
  {
    id: "refunded",
    displayName: "No. of Orders Refunded",
  },
  {
    id: "totalRefunded",
    displayName: "Total Refunded",
  },
];

const ReturnsReport: React.FC<{}> = (): JSX.Element => {
  const [dateValue, setDateValue] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ["returns-report"],
    queryFn: () => getReturnsReport(dateValue[0], dateValue[1]),
    enabled: dateValue.length > 0,
  });

  const getDateValue = (date: string[]) => setDateValue(date);

  return (
    <div>
      <PageHeader title="Returns Report" />
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
                  filename="returns"
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

export default ReturnsReport;
