"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { formatCurrency } from "@/utils/helpers";
import { Table, TableProps } from "antd";
import React from "react";
import { BsDownload } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;
const columns: TableProps["columns"] = [
  {
    key: "date",
    dataIndex: "date",
    title: "Date",
    className: "text-[1.063rem]",
    render: (_, item) => <div className="opacity-70 mb-0">{item.date}</div>,
  },
  {
    key: "no_orders",
    dataIndex: "orders",
    title: "No. Orders",
    className: "text-[1.063rem]",
    render: (_, item) => (
      <div className="opacity-70 hover:text-[#3875d7]">
        {item.numberOfOrders}
      </div>
    ),
  },
  {
    key: "products_sold",
    dataIndex: "sold",
    title: "Products Sold",
    className: "text-[1.063rem]",
    render: (_, item) => <div className="opacity-70">{item.productsSold}</div>,
  },
  {
    key: "tax",
    dataIndex: "tax",
    title: "Tax",
    className: "text-[1.063rem]",
    render: (_, item) => (
      <div className="opacity-70">{formatCurrency(item.tax)}</div>
    ),
  },
  {
    key: "total",
    dataIndex: "total",
    title: "Total",
    className: "text-[1.063rem]",
    render: (_, item) => (
      <div className="opacity-70">{formatCurrency(item.total)}</div>
    ),
  },
];

const Sales: React.FC<{}> = (): JSX.Element => {
  const [report, setReport] = React.useState<string>("");
  const [renderSales, setRendersales] = React.useState<any[]>([]);
  const [dateValue, setDateValue] = React.useState<string[]>([]);

  const getDateValue = (date: string[]): void => setDateValue(date);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
        Sales Report
      </h2>
      <Card>
        <Space direction="vertical" size={20} className="w-full">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1">
              <div>
                <input
                  type="text"
                  placeholder="Search sales"
                  // name={searchName}
                  // value={searchValue}
                  // onChange={searchOnChange}
                  className="bg-[#f1f0f0] outline-none rounded-tl-md rounded-bl-md w-full h-[45px] px-5"
                />
              </div>
              <div className="bg-[#f1f0f0] flex items-center justify-center h-[45px] w-[60px] rounded-tr-md rounded-br-md cursor-pointer">
                <IoSearchOutline
                  size={20}
                  fill="gray"
                  className="opacity-60 translate-x-2"
                />
              </div>
            </div>
            <div>
              <Button
                className="font-semibold rounded-md h-[45px] px-2 text-[dodgerblue] bg-[#e3f2f7]"
                // onClick={handleExport}
              >
                <BsDownload className="mr-1 text-[dodgerblue] font-bold mt-1" />{" "}
                Export Report
              </Button>
            </div>
          </div>
          <div>
            <RangePicker
              onChange={(_: any, info: any) => getDateValue?.(info)}
              className="p-3 text-[1.063rem]"
            />
          </div>
          <div className="overflow-x-scroll hide-scrollbar w-full">
            <div className="min-w-[800px] hide-scrollbar">
              <Table columns={columns} dataSource={renderSales} />
            </div>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Sales;
