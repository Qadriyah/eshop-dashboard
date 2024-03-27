import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";
import { CgMoreVerticalO } from "react-icons/cg";
import { HiViewfinderCircle } from "react-icons/hi2";
import { FiEdit3 } from "react-icons/fi";
import { SaleType } from "@/types/entities";

type IProps = {
  order: SaleType;
  onUpdateStatus: (order: SaleType) => void;
};

const DropMenu: React.FC<IProps> = ({ order, onUpdateStatus }) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={`/sales/orders/${order.id}`}>
          <div className="flex gap-2 items-center">
            <HiViewfinderCircle />
            <div>View</div>
          </div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex gap-2 items-center">
          <FiEdit3 />
          <div>Update Status</div>
        </div>
      ),
      onClick: () => onUpdateStatus(order),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      trigger={["click"]}
      className="text-gray-400 hover:text-gray-600 cursor-pointer"
    >
      <CgMoreVerticalO size={24} />
    </Dropdown>
  );
};

export default DropMenu;
