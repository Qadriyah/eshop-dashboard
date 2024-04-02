import React from "react";
import { NumericFormat } from "react-number-format";
import { Table } from "antd";
import type { TableProps } from "antd";
import { SaleType } from "@/types/entities";
import moment from "moment";
import { SALE_STATUS } from "@/utils/constants";

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
      className: "text-[1.063rem]",
      render: (_, item) => <div>{item.orderNumber}</div>,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div
          className={`px-1 rounded-lg flex justify-center items-center max-w-[120px] ${
            item.status === SALE_STATUS.cancelled
              ? "bg-red-200 text-red-600 border border-red-600"
              : item.status === SALE_STATUS.completed
              ? "bg-green-200 text-green-600 border border-green-600"
              : "bg-blue-200 text-blue-600 border border-blue-600"
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
      className: "text-[1.063rem]",
      align: "right",
      render: (_, item) => (
        <div>
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
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div>{moment(item.createdAt).format("MM/DD/YYYY")}</div>
      ),
    },
  ];

  return (
    <div className="min-w-[500px]">
      <Table
        columns={columns}
        dataSource={sales?.map((sale) => ({
          ...sale,
          key: Math.round(Math.random() * 1000000),
        }))}
      />
    </div>
  );
};

export default CustomerTransactionsTable;
