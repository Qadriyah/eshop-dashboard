import React from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiViewfinderCircle } from "react-icons/hi2";
import Link from "next/link";
import { CgMoreVerticalO } from "react-icons/cg";
import { UserType } from "@/types/entities";
import { RiUserForbidLine } from "react-icons/ri";
import Cookies from "js-cookie";

type DropdownProps = {
  customer: UserType;
  handleOpenDeleteModal: (customer: UserType) => void;
  handleOpenSuspendModal: (customer: UserType) => void;
};

const DropMenu: React.FC<DropdownProps> = ({
  customer,
  handleOpenDeleteModal,
  handleOpenSuspendModal,
}): JSX.Element => {
  const user = Cookies.get("_session-token");

  const items: MenuProps["items"] = [
    {
      label: (
        <Link href={`/customers/${customer.id}`} className="flex">
          <div className="flex gap-2 items-center">
            <HiViewfinderCircle />
            <div className="text-sm -mt-[3px] ml-1">View</div>
          </div>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className={`flex  gap-2 items-center ${
            user === customer.id && "pointer-events-none"
          }`}
          onClick={() => handleOpenSuspendModal(customer)}
        >
          <RiUserForbidLine />
          <div>Suspend</div>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div
          className={`flex  gap-2 items-center ${
            user === customer.id && "pointer-events-none"
          }`}
          onClick={() => handleOpenDeleteModal(customer)}
        >
          <RiDeleteBin6Line />
          <div>Delete</div>
        </div>
      ),
      key: "3",
    },
  ];

  if (user === customer?.id) items.splice(1, 2);
  if (customer?.deleted) items.pop();

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      className="text-gray-400 hover:text-gray-600 cursor-pointer"
    >
      <CgMoreVerticalO size={24} />
    </Dropdown>
  );
};

export default DropMenu;
