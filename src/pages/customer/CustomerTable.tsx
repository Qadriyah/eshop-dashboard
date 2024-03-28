"use client";

import React from "react";
import Dropdown from "../../components/Dropdown";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useRouter } from "next/navigation";
import { Customers } from "@/api/actions/customer";
import moment from "moment";
import DropdownCustomer from "./Dropdown";

type CustomerProps = {
  customers: Customers[];
};

const CustomerTable: React.FC<CustomerProps> = ({ customers }): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useRouter();
  // const [customerId, setCustomerId] = React.useState<string>();

  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement>,
    customerId: string
  ) => {
    setAnchorEl(event.currentTarget);
    // setCustomerId(customerId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ant

  const columns: TableProps<Customers>["columns"] = [
    {
      key: "customer_name",
      title: "Customer name",
      dataIndex: "customer_name",
      render: (_, item) => (
        <div
          className="text-[1.063rem] opacity-90 mb-0 cursor-pointer hover:text-blue-400"
          onClick={() => navigate.push(`/customers/${item.id}`)}
        >
          {item.profile.fullName}
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      render: (_, item) => (
        <div className="text-black text-[1.063rem] opacity-60 hover:text-[#3875d7]">
          {item.email}
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (_, item) => (
        <div
          className={`p-1 opacity-60 text-[1.063rem] font-bold text-center rounded-md ${
            item.status === "Banned"
              ? "text-red-600 bg-red-200"
              : item.status === "Active"
              ? "text-green-600 bg-green-200"
              : "text-blue-600 bg-blue-200"
          }`}
        >
          {item.status}
        </div>
      ),
    },
    {
      key: "created_date",
      title: "Created date",
      dataIndex: "created_date",
      render: (_, item) => (
        <div className="text-black text-[1.063rem] opacity-60">
          {moment(item.createdAt).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (_, item) => <DropdownCustomer />,
    },
  ];

  return (
    <>
      <div className="overflow-x-scroll hide-scrollbar w-full">
        <div className="min-w-[800px] hide-scrollbar">
          <Table
            columns={columns}
            dataSource={customers.map((customer, index) => ({
              ...customer,
              key: customer.id,
              status:
                index % 2 === 0
                  ? "Active"
                  : index % 3 === 0
                  ? "Banned"
                  : "Suspended",
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default CustomerTable;
