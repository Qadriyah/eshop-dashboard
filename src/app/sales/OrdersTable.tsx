"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import { Table, TableProps } from "antd";
import { SaleStatusType, SaleType } from "@/types/entities";
import moment from "moment";
import { CgMoreVerticalO } from "react-icons/cg";
import Dropdown from "@/components/Dropdown";
import { MenuItem, Radio } from "@mui/material";
import Link from "next/link";
import UpdateStatusModal from "@/modals/UpdateStatusModal";
import RadioComponent from "@/components/Radio";
import RadioInput from "@/components/RadioInput";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";

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
      render: (_, item) => (
        <div className="flex">
          {/* <img
            src={item.user}
            alt=""
            className="w-[40px] h-[40px] rounded-md mr-2"
          /> */}
          <div className="font-semibold text-[1.063rem] opacity-90 mb-4 translate-y-2">
            {item?.customer?.name}
          </div>
        </div>
      ),
    },
    {
      key: "orderid",
      title: "Order ID",
      dataIndex: "orderid",
      render: (_, item) => (
        <div className="font-semibold text-[1.063rem] text-black opacity-60">
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
          className={`font-semibold text-[1.063rem] opacity-70 p-1 rounded-lg text-center ${
            item.status === "Cancelled"
              ? "text-[#f7657d] bg-[#f7d0d6]"
              : item.status === "Completed" || item.status === "Delivered"
              ? "text-[#57ec70] bg-[#abf7b1]"
              : item.status === "Delivering" || item.status === "Processing"
              ? "text-blue-500 bg-[#dff2ff]"
              : "text-orange-500 bg-orange-100"
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
      render: (_, item) => (
        <div className="font-bold text-black opacity-60 text-[1.063rem] text-center">
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
        <div
          className={`font-bold opacity-70 text-[1.063rem] text-center p-1 rounded-lg`}
        >
          {moment(item.createdAt).format("MM-DD-YYYY")}
        </div>
      ),
    },
    {
      key: "date_Modified",
      title: "Date Modified",
      dataIndex: "date_Modified",
      render: (_, item) => (
        <div
          className={`font-semibold opacity-70 p-1 rounded-lg text-[1.063rem]`}
        >
          {moment(item.updatedAt).format("MM-DD-YYYY")}
        </div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
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
    <>
      <div className="overflow-x-scroll w-full">
        <Suspense
          fallback={
            <div className="w-full flex justify-center p-0 m-0">
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
      <UpdateStatusModal
        title="Update status"
        open={openModal}
        handleOk={(): any => {}}
        handleClose={(): void => setOpenModal(false)}
      >
        <RadioComponent
          id="discountType"
          name="discountType"
          formLabel=""
          defaultValue={status}
          value={status}
        >
          <RadioInput
            ref_={false}
            value={"Pending"}
            label="Pending"
            onChange={() => setStatus("Pending")}
            control={<Radio />}
          />
          <RadioInput
            ref_={false}
            value={"Processing"}
            label="Processing"
            onChange={() => setStatus("Processing")}
            control={<Radio />}
          />
          <RadioInput
            ref_={false}
            value={"Completed"}
            label="Completed"
            onChange={() => setStatus("Completed")}
            control={<Radio />}
          />
          <RadioInput
            ref_={false}
            value={"Delivering"}
            label="Delivering"
            onChange={() => setStatus("Delivering")}
            control={<Radio />}
          />
          <RadioInput
            ref_={false}
            value={"Delivered"}
            label="Delivered"
            onChange={() => setStatus("Delivered")}
            control={<Radio />}
          />
          <RadioInput
            ref_={false}
            value={"Cancelled"}
            label="Cancelled"
            onChange={() => setStatus("Cancelled")}
            control={<Radio />}
          />
          <RadioInput
            ref_={false}
            value={"Refunded"}
            label="Refunded"
            onChange={() => setStatus("Refunded")}
            control={<Radio />}
          />
        </RadioComponent>
      </UpdateStatusModal>
    </>
  );
};

export default OrdersTable;
