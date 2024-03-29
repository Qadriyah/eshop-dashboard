import React from "react";
import { NumericFormat } from "react-number-format";
import { transactions } from "../../components/Dummy/transactions";
import { Table } from "antd";
import type { TableProps } from "antd";

const CustomerTransactionsTable: React.FC<{}> = (): JSX.Element => {
  // ant
  interface transactionsProps {
    key: string;
    orderNumber: string | number;
    status: string;
    amount: number;
    date: string;
  }
  const columns: TableProps<transactionsProps>["columns"] = [
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
            item.status === "Rejected"
              ? "text-[#f18d9d] bg-red-50"
              : item.status === "Successful"
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
            value={item.amount}
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
        <div className="font-semibold text-black opacity-60">{item.date}</div>
      ),
    },
  ];

  return (
    <div className="overflow-x-scroll hide-scrollbar w-full">
      <div className="min-w-[600px] hide-scrollbar">
        <Table columns={columns} dataSource={transactions} />
      </div>
    </div>
  );
};

export default CustomerTransactionsTable;

// "test": "react-scripts test",
//     "eject": "react-scripts eject"
