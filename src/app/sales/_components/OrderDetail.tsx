import { Space } from "antd";
import Image from "next/image";
import React, { LiHTMLAttributes } from "react";

type OrderDetailProps = LiHTMLAttributes<HTMLLIElement> & {
  icon: any;
  label: string;
  value: string;
  image?: string;
};

const OrderDetail: React.FC<OrderDetailProps> = ({
  icon,
  label,
  value,
  image,
}): JSX.Element => {
  return (
    <li className="w-full border-b border-b-[#e2dfdf] m-0 pb-3 flex justify-between mt-3">
      <span className="opacity-50 text-base flex">
        {icon} {label}
      </span>
      <span
        className={`flex ${
          (label === "Customer" || label === "Invoice") &&
          "hover:text-[#3875d7] cursor-pointer"
        }`}
      >
        <Space direction="horizontal">
          {image && (
            <Image
              src={image}
              alt=""
              width={30}
              height={30}
              className="rounded-full"
            />
          )}
          {value}
        </Space>
      </span>
    </li>
  );
};

export default OrderDetail;
