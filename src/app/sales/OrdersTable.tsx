"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import { Space, Table, TableProps } from "antd";
import { SaleStatusType, SaleType } from "@/types/entities";
import moment from "moment";
import { CgMoreVerticalO } from "react-icons/cg";
import Dropdown from "@/components/Dropdown";
import { MenuItem } from "@mui/material";
import Link from "next/link";
import UpdateStatusModal from "@/modals/UpdateStatusModal";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import { SALE_STATUS } from "@/utils/constants";
import ShouldRender from "@/components/ShouldRender";

type OrderProps = {
  orders: SaleType[];
  isLoading: boolean;
};

const OrdersTable: React.FC<OrderProps> = ({
  orders,
  isLoading,
}): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [orderId, setOrderId] = React.useState<string>("");
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<SaleStatusType>();

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement>,
    orderId: string,
    status: SaleStatusType
  ) => {
    setAnchorEl(event.currentTarget);
    setOrderId(orderId);
    setStatus(status);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns: TableProps<SaleType>["columns"] = [
    {
      key: "customer",
      title: "Customer",
      dataIndex: "customer",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <Space direction="horizontal">
          <div
            className="h-[45px] rounded-md"
            style={{
              backgroundImage: `url(${item.user.avator})`,
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
          className={`p-1 rounded-md text-center ${
            item.status === SALE_STATUS.cancelled
              ? "text-red-600 bg-red-200 border border-red-600"
              : item.status === SALE_STATUS.completed ||
                item.status === SALE_STATUS.delivered
              ? "text-green-600 bg-green-200 border border-green-600"
              : item.status === SALE_STATUS.delivering ||
                item.status === SALE_STATUS.processing
              ? "text-blue-600 bg-blue-200 border border-blue-600"
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
        <Dropdown
          title={<CgMoreVerticalO size={24} className="cursor-pointer" />}
          anchorEl={anchorEl}
          handleClick={(event) => handleClick(event, item.id, item.status)}
          handleClose={handleClose}
          id="confirm"
          open={open}
        >
          <MenuItem>
            <Link href={`/sales/orders/${orderId}`}>View</Link>
          </MenuItem>
          <MenuItem
            onClick={(): void => {
              setOpenModal(true);
              handleClose();
            }}
          >
            Update order status
          </MenuItem>
        </Dropdown>
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
      <ShouldRender visible={openModal}>
        <UpdateStatusModal
          title="Update status"
          open={openModal}
          handleOk={(): any => {}}
          handleClose={(): void => setOpenModal(false)}
          setStatus={setStatus}
          value={status}
        />
      </ShouldRender>
    </div>
  );
};

export default OrdersTable;
