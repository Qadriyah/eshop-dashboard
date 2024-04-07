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
  user: UserType;
  handleOpenDeleteModal: (user: UserType) => void;
  handleOpenSuspendModal: (user: UserType) => void;
  handleOpenUnsuspendModal: (user: UserType) => void;
};

const DropMenu: React.FC<DropdownProps> = ({
  user,
  handleOpenDeleteModal,
  handleOpenSuspendModal,
  handleOpenUnsuspendModal,
}): JSX.Element => {
  const userId = Cookies.get("_session-token");

  const items: MenuProps["items"] = [
    {
      label: (
        <Link href={`/settings/profile/${user?.id}`} className="flex">
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
        <div className={`${user.deleted && "hidden"}`}>
          {user?.suspended ? (
            <div
              className={`flex  gap-2 items-center ${
                userId === user.id && "pointer-events-none"
              }`}
              onClick={() => handleOpenUnsuspendModal(user)}
            >
              <RiUserForbidLine />
              <div>Restore</div>
            </div>
          ) : (
            <div
              className={`flex  gap-2 items-center ${
                userId === user.id && "pointer-events-none"
              }`}
              onClick={() => handleOpenSuspendModal(user)}
            >
              <RiUserForbidLine />
              <div>Suspend</div>
            </div>
          )}
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div
          className={`flex  gap-2 items-center ${
            userId === user.id && "pointer-events-none"
          } ${user?.deleted && "hidden"}`}
          onClick={() => handleOpenDeleteModal(user)}
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
