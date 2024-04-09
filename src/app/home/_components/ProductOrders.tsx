"use client";
import React from "react";
import { DatePicker, DatePickerProps, Table, TableProps } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import Card from "@/components/Card";
import { formatCurrency } from "@/utils/helpers";
import { SALE_STATUS } from "@/utils/constants";
import { SaleType } from "@/types/entities";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "@/api/actions/sales";
import ExpandableRow from "./ExpandableRow";
import Suspense from "@/components/Suspense";
import ProductOrdersLoader from "./_loaders/ProductOrdersLoader";

export type LineItem = {
  key: string;
  name: string;
  quantity: number;
  price: number;
};

type DataType = {
  key: string;
  orderNumber: number;
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
  totalAmount: number;
  tax: number;
  shipping: number;
  status: string;
  children: LineItem[];
};
const { RangePicker } = DatePicker;
const columns: TableProps<DataType>["columns"] = [
  {
    key: "orderNumber",
    dataIndex: "orderNumber",
    title: "Order#",
    className: "text-[1.063rem]",
    render: (_, item) => <div>{item.orderNumber}</div>,
  },
  {
    key: "createdAt",
    dataIndex: "createdAt",
    title: "Created",
    className: "text-[1.063rem]",
    render: (_, item) => (
      <div>{moment(item.createdAt).format("MM/DD/YYYY")}</div>
    ),
  },
  {
    key: "customer",
    dataIndex: "customer",
    title: "Customer",
    className: "text-[1.063rem]",
    render: (_, item) => (
      <div className="mt-[10px]">
        <div>{item.customer?.name}</div>
        <div className="text-sm opacity-45 -mt-2">{item.customer?.email}</div>
      </div>
    ),
  },
  {
    key: "tax",
    dataIndex: "tax",
    title: "Tax",
    className: "text-[1.063rem]",
    align: "right",
    render: (_, item) => <div>{formatCurrency(item.tax)}</div>,
  },
  {
    key: "shipping",
    dataIndex: "shipping",
    title: "Shipping",
    className: "text-[1.063rem]",
    align: "right",
    render: (_, item) => <div>{formatCurrency(item.shipping)}</div>,
  },
  {
    key: "total",
    dataIndex: "total",
    title: "Total",
    className: "text-[1.063rem]",
    align: "right",
    render: (_, item) => <div>{formatCurrency(item.totalAmount)}</div>,
  },
  {
    key: "status",
    dataIndex: "status",
    title: "Status",
    className: "text-[1.063rem]",
    render: (_, item) => (
      <div
        className={`px-1 rounded-md text-center ${
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
        {item.status}
      </div>
    ),
  },
];

const formatData = (data: SaleType[]): DataType[] => {
  return data?.map((sale) => ({
    key: sale.id,
    orderNumber: sale.orderNumber,
    createdAt: sale.createdAt,
    customer: sale.customer,
    totalAmount: sale.totalAmount,
    status: sale.status,
    tax: sale.tax,
    shipping: sale.shipping,
    children: sale.lineItems?.map((item) => ({
      key: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
  }));
};

const ProductOrders = () => {
  const [dateRange, setDateRange] = React.useState<string[]>([
    moment().startOf("M").format("YYYY-MM-DD"),
    moment().endOf("M").format("YYYY-MM-DD"),
  ]);

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    setDateRange(() => [
      date.startOf("M").format("YYYY-MM-DD"),
      date.endOf("M").format("YYYY-MM-DD"),
    ]);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["sales-orders", dateRange],
    queryFn: () =>
      getSales({
        limit: 10,
        from: dateRange[0],
        to: dateRange[1],
      }),
  });

  const sales = React.useMemo(
    () => formatData(data?.sales || []),
    [data?.sales]
  );

  return (
    <Suspense fallback={<ProductOrdersLoader />} loading={isLoading}>
      <Card>
        <div className="h-[458px] flex flex-col gap-3">
          <div className="flex gap-5">
            <div className="flex-1">
              <div className="text-xl">Product Orders</div>
              <div className="text-sm opacity-45">Avg. 52 orders per day</div>
            </div>
            <div>
              <DatePicker
                defaultValue={dayjs(dateRange[0])}
                onChange={onChangeDate}
                picker="month"
                className="p-2 pl-5"
              />
            </div>
          </div>
          <div className="overflow-scroll">
            <div className="min-w-[700px]">
              <Table
                columns={columns}
                dataSource={sales}
                pagination={false}
                expandable={{
                  expandedRowRender: (record) => (
                    <ExpandableRow products={record?.children || []} />
                  ),
                  rowExpandable: () => true,
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </Suspense>
  );
};

export default ProductOrders;
