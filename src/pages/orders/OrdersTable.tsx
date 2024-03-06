"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import Dropdown from "../../components/Dropdown";
import ConfirmationModel from "../../modals/ConfimationModel";
import ShouldRender from "../../components/ShouldRender";
import { Table, TableProps } from "antd";
import { OrdersProps, deleteOrder } from "../../redux/slices/orders";
import { useDispatchHook } from "../../redux/hooks/hooks";
import { useRouter } from "next/navigation";

type OrderProps = {
  orders: any[];
};

const OrdersTable: React.FC<OrderProps> = ({ orders }): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
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
  const dispatch = useDispatchHook();

  const handleConfirm = (): void => {
    dispatch(deleteOrder(orderId));
  };

  const columns: TableProps<OrdersProps>["columns"] = [
    {
      key: "customer",
      title: "Customer",
      dataIndex: "customer",
      render: (_, item) => (
        <div className="flex">
          <img
            src={item.customer.customerImage}
            alt=""
            className="w-[40px] h-[40px] rounded-md mr-2"
          />
          <div className="font-semibold text-sm opacity-90 mb-0 translate-y-2">
            {item.customer.customerName}
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
          {item.orderId}
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
            item.status === "Expired" ||
            item.status === "Failed" ||
            item.status === "Refunded" ||
            item.status === "Denied" ||
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
            value={item.total}
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
          {item.dateAdded}
        </div>
      ),
    },
    {
      key: "date_Modified",
      title: "Date Modified",
      dataIndex: "date_Modified",
      render: (_, item) => (
        <div className={`font-semibold opacity-70 p-1 rounded-lg`}>
          {item.dateModified}
        </div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (_, item) => (
        <Dropdown
          anchorEl={anchorEl}
          handleClick={(event) => handleClick(event, item.orderId as string)}
          handleClose={handleClose}
          id="image"
          open={open}
          title="Actions"
        >
          <div className="w-[150px]">
            <ul>
              <li
                className="hover:bg-[#f0f0f1] p-2 cursor-pointer"
                onClick={() =>
                  navigate.push(`/dashboard/orders/${orderId}`)
                }
              >
                View
              </li>
              <li
                className="hover:bg-[#f0f0f1] p-2 cursor-pointer"
                onClick={() => {
                  setOpenDeleteModal(true);
                  handleClose();
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-scroll w-full">
        <div className="min-w-[800px]">
          <Table columns={columns} dataSource={orders} />
        </div>
      </div>
      <ShouldRender visible={openDeleteModal}>
        <ConfirmationModel
          title="Delete Order"
          message="Are sure you want to delete this order?"
          open={openDeleteModal}
          handleClose={() => setOpenDeleteModal(false)}
          onConfirm={() => {
            handleConfirm();
            setOpenDeleteModal(false);
          }}
        />
      </ShouldRender>
    </>
  );
};

export default OrdersTable;
