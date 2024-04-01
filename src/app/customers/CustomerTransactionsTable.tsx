import React from "react";
import { NumericFormat } from "react-number-format";
import { Table } from "antd";
import type { TableProps } from "antd";
import { SaleType } from "@/types/entities";
import moment from "moment";

interface SalesProps {
  sales: SaleType[];
}

const CustomerTransactionsTable: React.FC<SalesProps> = ({
  sales,
}): JSX.Element => {
  const columns: TableProps<SaleType>["columns"] = [
    {
      key: "order_no",
      title: "Order no.",
      dataIndex: "order_no",
      render: (_, item) => (
        <div className="font-semibold opacity-60 ">{item.orderNumber}</div>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (_, item) => (
        <div
          className={`font-bold opacity-70 text-center text-xs p-1 rounded-lg ${
            item.status === "Cancelled"
              ? "text-[#f18d9d] bg-red-50"
              : item.status === "Completed"
              ? "text-[#5ced73] bg-green-50"
              : "text-[#75bfec] bg-blue-50"
          }`}
        >
          {item.status}
        </div>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      dataIndex: "amount",
      render: (_, item) => (
        <div className="font-semibold text-black opacity-60">
          <NumericFormat
            value={item.totalAmount}
            prefix={"$"}
            thousandSeparator=","
            displayType="text"
          />
        </div>
      ),
    },
    {
      key: "date",
      title: "Date",
      dataIndex: "date",
      render: (_, item) => (
        <div className="font-semibold text-black opacity-60">
          {moment(item.createdAt).format("MM/DD/YYYY")}
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-scroll hide-scrollbar w-full">
      <div className="min-w-[600px] hide-scrollbar">
        <Table
          columns={columns}
          dataSource={sales?.map((sale) => ({
            ...sale,
            key: Math.round(Math.random() * 1000000),
          }))}
        />
      </div>
    </div>
  );
};

export default CustomerTransactionsTable;
