import React, { LiHTMLAttributes } from "react";

type OrderDetailProps = LiHTMLAttributes<HTMLLIElement> & {
  icon: any;
  label: string;
  value: string;
  showImage?: boolean;
  image?: string;
  imageClass?: string;
};

const OrderDetail: React.FC<OrderDetailProps> = ({
  icon,
  label,
  value,
  showImage = false,
  image,
  imageClass,
  ...props
}): JSX.Element => {
  return (
    <li className="w-full border-b border-b-[#e2dfdf] m-0 pb-3 flex justify-between mt-3">
      <span className="opacity-50 text-base flex">
        {icon} {label}
      </span>
      <span
        className={`font-bold opacity-70 flex ${
          (label === "Customer" || label === "Invoice") &&
          "hover:text-[#3875d7] cursor-pointer"
        }`}
        {...props}
      >
        {showImage && <img src={image} alt="" className={imageClass} />}
        {value}
      </span>
    </li>
  );
};

export default OrderDetail;
