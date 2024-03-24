"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import Dropdown from "../../components/Dropdown";
import { Table, TableProps } from "antd";
import { useRouter } from "next/navigation";
import { SaleType } from "@/types/entities";

type OrderProps = {
  orders: SaleType[];
};

const OrdersTable: React.FC<OrderProps> = ({ orders }): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [orderId, setOrderId] = React.useState<string>("");
  const navigate = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLImageElement>,
    orderId: string
  ): void => {
    setAnchorEl(event.currentTarget);
    setOrderId(orderId);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const columns: TableProps<SaleType>["columns"] = [
    {
      key: "customer",
      title: "Customer",
      dataIndex: "customer",
      render: (_, item) => (
        <div className="flex">
          {/* <img
            src={item.user}
            alt=""
            className="w-[40px] h-[40px] rounded-md mr-2"
          /> */}
          <div className="font-semibold text-sm opacity-90 mb-4 translate-y-2">
            {item?.customer.name}
          </div>
        </div>
      ),
    },
    {
      key: "orderid",
      title: "Order ID",
      dataIndex: "orderid",
      render: (_, item) => (
        <div className="font-semibold text-black opacity-60">
          {item.orderNumber}
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (_, item) => (
        <div
          className={`font-semibold text-xs opacity-70 p-1 rounded-lg text-center ${
            item.status === "Cancelled"
              ? "text-[#f7657d] bg-[#f7d0d6]"
              : item.status === "Completed" || item.status === "Delivered"
              ? "text-[#57ec70] bg-[#abf7b1]"
              : item.status === "Delivering" || item.status === "Processing"
              ? "text-blue-500 bg-[#dff2ff]"
              : "text-[orange] bg-[#f7dcab]"
          }`}
        >
          {item.status}
        </div>
      ),
    },
    {
      key: "total",
      title: "Total",
      dataIndex: "total",
      render: (_, item) => (
        <div className="font-bold text-black opacity-60 text-center">
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
      key: "date_added",
      title: "Date Added",
      dataIndex: "date_added",
      render: (_, item) => (
        <div className={`font-bold opacity-70 text-center p-1 rounded-lg`}>
          {item.createdAt.split("T")[0]}
        </div>
      ),
    },
    {
      key: "date_Modified",
      title: "Date Modified",
      dataIndex: "date_Modified",
      render: (_, item) => (
        <div className={`font-semibold opacity-70 p-1 rounded-lg`}>
          {item.updatedAt.split("T")[0]}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-scroll w-full">
        <div className="min-w-[800px]">
          <Table
            columns={columns}
            dataSource={orders?.map((order) => ({ ...order, key: order.id }))}
            onRow={(data): any => {
              return {
                onClick: () => navigate.push(`/sales/orders/${data.id}`),
              };
            }}
          />
        </div>
      </div>
    </>
  );
};

export default OrdersTable;
