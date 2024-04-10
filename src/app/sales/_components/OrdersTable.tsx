"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import { Space, Table, TableProps } from "antd";
import { SaleType } from "@/types/entities";
import moment from "moment";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import { SALE_STATUS } from "@/utils/constants";
import DropMenu from "./DropMenu";

type OrderProps = {
  orders: SaleType[];
  isLoading: boolean;
  onUpdateStatus: (order: SaleType) => void;
};

const OrdersTable: React.FC<OrderProps> = ({
  orders,
  isLoading,
  onUpdateStatus,
}): JSX.Element => {
  const columns: TableProps<SaleType>["columns"] = [
    {
      key: "customer",
      title: "Customer",
      dataIndex: "customer",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <Space direction="horizontal">
          <div
            className="h-[45px] rounded-md border border-gray-300"
            style={{
              backgroundImage: `url(${
                item.user.avator || "/assets/images/image.svg"
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "45px",
            }}
          />
          <div>{item?.customer?.name}</div>
        </Space>
      ),
    },
    {
      key: "orderid",
      title: "Order ID",
      dataIndex: "orderid",
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
          className={`px-1 w-[110px] rounded-md text-center ${
            item.status === SALE_STATUS.cancelled
              ? "text-red-600 bg-red-200 border border-red-600"
              : item.status === SALE_STATUS.completed
              ? "text-green-600 bg-green-200 border border-green-600"
              : item.status === SALE_STATUS.delivering ||
                item.status === SALE_STATUS.processing
              ? "text-blue-600 bg-blue-200 border border-blue-600"
              : item.status === SALE_STATUS.returned
              ? "text-purple-600 bg-purple-200 border border-purple-600"
              : "text-orange-600 bg-orange-200 border border-orange-600"
          }`}
        >
          {item?.status}
        </div>
      ),
    },
    {
      key: "total",
      title: "Total",
      dataIndex: "total",
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
      key: "date_added",
      title: "Date Added",
      dataIndex: "date_added",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div>{moment(item.createdAt).format("MM/DD/YYYY")}</div>
      ),
    },
    {
      key: "date_Modified",
      title: "Date Modified",
      dataIndex: "date_Modified",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div>{moment(item.updatedAt).format("MM/DD/YYYY")}</div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <DropMenu order={item} onUpdateStatus={onUpdateStatus} />
      ),
    },
  ];

  return (
    <div className="overflow-x-scroll w-full">
      <Suspense
        fallback={
          <div className="w-full flex justify-center items-center h-52">
            <Loader color="black" />
          </div>
        }
        loading={isLoading}
      >
        <div className="min-w-[800px]">
          <Table
            columns={columns}
            dataSource={orders?.map((order) => ({ ...order, key: order.id }))}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default OrdersTable;
