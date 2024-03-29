import React from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiViewfinderCircle } from "react-icons/hi2";
import Link from "next/link";
import { CgMoreVerticalO } from "react-icons/cg";
import { ProfileType, UserType } from "@/types/entities";
import { getItem } from "@/api/localstorage";
import { RiUserForbidLine } from "react-icons/ri";

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
  const profile = getItem<ProfileType>("user");

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
            profile?.user?.id === customer.id && "pointer-events-none"
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
            profile?.user?.id === customer.id && "pointer-events-none"
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
