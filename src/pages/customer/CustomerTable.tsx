"use client";

import React from "react";
import Dropdown from "../../components/Dropdown";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useRouter } from "next/navigation";
import { Customers } from "@/api/actions/customer";

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
          className="text-base opacity-90 mb-0 cursor-pointer hover:text-blue-400"
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
        <div className="text-black opacity-60 hover:text-[#3875d7]">
          {item.email}
        </div>
      ),
    },
    // {
    //   key: "status",
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (_, item) => (
    //     <div
    //       className={`p-1 opacity-60 text-xs text-center rounded-md ${
    //         item.status === "Locked"
    //           ? "text-[#f18d9d] bg-red-50"
    //           : "text-[#5ced73] bg-green-50"
    //       }`}
    //     >
    //       {item.status}
    //     </div>
    //   ),
    // },
    {
      key: "created_date",
      title: "Created date",
      dataIndex: "created_date",
      render: (_, item) => (
        <div className="text-black opacity-60">
          {item.createdAt.split("T")[0]}
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
          handleClick={(event) => handleClick(event, item.id)}
          handleClose={handleClose}
          id={`image-${item.id}`}
          open={open}
          title="Actions"
        >
          <div className="w-[100px]">
            <ul>
              <li
                className="hover:bg-[#f0f0f1] p-2 cursor-pointer"
                onClick={() => {
                  handleClose();
                  navigate.push(`/customers/${item.id}`);
                }}
              >
                View
              </li>
            </ul>
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-scroll hide-scrollbar w-full">
        <div className="min-w-[800px] hide-scrollbar">
          <Table
            columns={columns}
            dataSource={customers.map((customer) => ({
              ...customer,
              key: customer.id,
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default CustomerTable;
