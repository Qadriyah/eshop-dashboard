import React from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiViewfinderCircle } from "react-icons/hi2";
import { TbUserPause } from "react-icons/tb";
import Link from "next/link";
import { CgMoreVerticalO } from "react-icons/cg";
import { UserType } from "@/types/entities";

type DropdownProps = {
  customer: UserType;
  handleOpenDeleteModal: (customer: UserType) => void;
  handleOpenSuspendModal: (customer: UserType) => void;
};

const DropdownCustomer: React.FC<DropdownProps> = ({
  customer,
  handleOpenDeleteModal,
  handleOpenSuspendModal,
}): JSX.Element => {
  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className="flex"
          onClick={() => {
            handleOpenDeleteModal(customer);
          }}
        >
          <RiDeleteBin6Line />
          <p className="text-sm -mt-[3px] ml-1">Delete</p>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <Link href={`/customers/${customer.id}`} className="flex">
          <HiViewfinderCircle />
          <p className="text-sm -mt-[3px] ml-1">View</p>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className="flex"
          onClick={() => {
            handleOpenSuspendModal(customer);
          }}
        >
          <TbUserPause />
          <p className="text-sm -mt-[3px] ml-1">Suspend</p>
        </div>
      ),
      key: "2",
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <CgMoreVerticalO size={24} className="cursor-pointer opacity-45" />
    </Dropdown>
  );
};

export default DropdownCustomer;
