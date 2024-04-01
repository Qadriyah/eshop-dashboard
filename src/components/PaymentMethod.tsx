import React from "react";
import { PaymentMethodType } from "@/types/entities";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

type PaymentMethodProps = {
  image: string;
  card: PaymentMethodType;
};

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  image,
  card,
}): JSX.Element => {
  return (
    <details className="mt-5 outline-none pb-1 mb-4 border-b border-dashed border-[#d8d2d2]">
      <summary className="flex hover:font-bold cursor-pointer">
        <img src={image} alt="" className="[w-23px] h-[12px] mr-3" />
        <div className="-translate-y-4">
          <p className="opacity-80">{card.brand}</p>
          <p className="opacity-60 text-sm -mt-1">{card.expiry}</p>
        </div>
      </summary>
      <div className="flex justify-between flex-col lg:flex-row">
        <div>
          <p className="opacity-90">
            <span className="opacity-60">Name: </span>
            {card.billing_address.name}
          </p>
          <p className="opacity-90">
            <span className="opacity-60">Number: </span>
            ******{card.last4}
          </p>
          <p className="opacity-90">
            <span className="opacity-60">Brand: </span>
            {card.brand}
          </p>
        </div>
        <div>
          <p className="opacity-90">
            <span className="opacity-60">Billing Address: </span>
            {card.billing_address.address.line1}
          </p>
          <p className="opacity-90">
            <span className="opacity-60">Phone: </span>
            {card.billing_address.phone}
          </p>
          <p className="opacity-90">
            <span className="opacity-60">Email: </span>
            {card.billing_address.email}
          </p>
          <p className="opacity-90">
            <span className="opacity-60">Country: </span>
            {card.country}
          </p>
          <p className="opacity-90 flex gap-2 items-center">
            <span className="opacity-60">Passed: </span>
            {card.checks?.cvc_check === "pass" ? (
              <FaCheckCircle fill="#0f0" />
            ) : (
              <MdCancel fill="#f00" />
            )}
          </p>
        </div>
      </div>
    </details>
  );
};

export default PaymentMethod;
