"use client";

import React from "react";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Table } from "antd";
import type { TableProps } from "antd";
import { NumericFormat } from "react-number-format";
import { useSelectorHook } from "@/redux/hooks/hooks";
import Card from "@/components/Card";
import Report from "@/components/Report";

const CustomerOrders: React.FC<{}> = (): JSX.Element => {
  const [report, setReport] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("All");
  const customerOrdersReports = useSelectorHook(
    (state) => state.report.customerOrders
  );
  const [renderSales, setRendersales] = React.useState<any[]>(
    customerOrdersReports
  );
  const [dateValue, setDateValue] = React.useState<string[]>([]);

  const searchedData = customerOrdersReports.filter((customer) =>
    customer.customerName.toLocaleLowerCase().includes(report)
  );
  const searchByDate = customerOrdersReports.filter(
    (customer) =>
      customer.datesJoined >= dateValue[0] &&
      customer.datesJoined <= dateValue[1]
  );
  const searchByStatus = customerOrdersReports.filter(
    (customer) => customer.status === status
  );

  const getDateValue = (date: string[]): void => setDateValue(date);

  React.useEffect(() => {
    if (report === "") {
      if (dateValue[0] !== "") {
        setRendersales(searchByDate);
      }
      if (dateValue.length <= 0 || dateValue[0] === "" || status === "All") {
        setRendersales(customerOrdersReports);
      }
      if (status !== "All") {
        setRendersales(searchByStatus);
      }
    } else {
      setRendersales(searchedData);
    }
  }, [report, dateValue, status]);
  // ant
  type CustomerOrder = {
    key: string;
    customerName: string;
    email: string;
    status: string;
    datesJoined: string;
    noOrders: number;
    noProducts: number;
    total: number;
  };

  const columns: TableProps<CustomerOrder>["columns"] = [
    {
      key: "customer_name",
      title: "Customer name",
      dataIndex: "customer_name",
      render: (_, item) => (
        <div className="opacity-70 mb-0">{item.customerName}</div>
      ),
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      render: (_, item) => (
        <div className="opacity-70 hover:text-[#3875d7]">{item.email}</div>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (_, item) => (
        <div
          className={`opacity-70 font-semibold text-center p-1 text-xs ${
            item.status === "Active"
              ? "text-green-500 border border-green-500 rounded-lg"
              : item.status === "Disabled"
              ? "text-blue-500 border border-blue-500 rounded-lg"
              : "text-red-500 border border-red-500 rounded-lg"
          }`}
        >
          {item.status}
        </div>
      ),
    },
    {
      key: "date_joined",
      title: "Date joined",
      dataIndex: "date_joined",
      render: (_, item) => <div>{item.datesJoined}</div>,
    },
    {
      key: "no_orders",
      title: "No. orders",
      dataIndex: "no_orders",
      render: (_, item) => <div>{item.noOrders}</div>,
    },
    {
      key: "no_products",
      title: "No. products",
      dataIndex: "no_products",
      render: (_, item) => <div>{item.noProducts}</div>,
    },
    {
      key: "total",
      title: "Total",
      dataIndex: "total",
      render: (_, item) => (
        <div className="opacity-70">
          <NumericFormat
            value={item.total}
            prefix={"$"}
            thousandSeparator=","
            displayType="text"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
        Customer Orders report
      </h2>
      <Card>
        <Report
          searchName="report"
          searchValue={report}
          placeholder="Search report"
          searchOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setReport(event.target.value)
          }
          handleChange={(event: SelectChangeEvent) =>
            setStatus(event.target.value as string)
          }
          value={status}
          showStatus={true}
          handleExport={() => {}}
          getDateValue={getDateValue}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Active"}>Active</MenuItem>
          <MenuItem value={"Locked"}>Locked</MenuItem>
          <MenuItem value={"Disabled"}>Disabled</MenuItem>
          <MenuItem value={"Banned"}>Banned</MenuItem>
        </Report>
        <div className="overflow-x-scroll hide-scrollbar w-full">
          <div className="min-w-[800px] hide-scrollbar">
            <Table columns={columns} dataSource={renderSales} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomerOrders;
