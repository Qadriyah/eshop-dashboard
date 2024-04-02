import React from "react";
import { PaymentMethodType } from "@/types/entities";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import moment from "moment";
import Image from "next/image";

type IProps = {
  card: PaymentMethodType;
};

const cardIcons: Record<string, string> = {
  visa: "/assets/images/visa.svg",
  mastercard: "/assets/images/mastercard.svg",
  americanexpress: "/assets/images/american-express.svg",
};

const PaymentMethod: React.FC<IProps> = ({ card }): JSX.Element => {
  const expired = card?.checks?.cvc_check === "fail";

  return (
    <details
      className="outline-none border-b border-dashed border-[#d8d2d2] rotate-0"
      open={card?.primary}
    >
      <summary className="flex hover:font-bold cursor-pointer items-center py-3">
        <div className="me-3 rotate-90d">
          <span className="svg-icon svg-icon-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6343 12.5657L8.45001 16.75C8.0358 17.1642 8.0358 17.8358 8.45001 18.25C8.86423 18.6642 9.5358 18.6642 9.95001 18.25L15.4929 12.7071C15.8834 12.3166 15.8834 11.6834 15.4929 11.2929L9.95001 5.75C9.5358 5.33579 8.86423 5.33579 8.45001 5.75C8.0358 6.16421 8.0358 6.83579 8.45001 7.25L12.6343 11.4343C12.9467 11.7467 12.9467 12.2533 12.6343 12.5657Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
        <Image
          src={cardIcons[card?.brand]}
          alt=""
          className="mr-3"
          width={60}
          height={20}
        />
        <div className="flex-1">
          <div className="flex items-center gap-5">
            <div className="font-semibold opacity-80 capitalize">
              {card?.brand}
            </div>
            <div
              className={`text-sm px-4 rounded-full ${
                expired
                  ? "bg-red-100 text-red-600 border"
                  : card?.primary
                  ? "bg-blue-100 text-blue-600 border"
                  : ""
              }`}
            >
              {expired ? "Expired" : card?.primary ? "Primary" : ""}
            </div>
          </div>
          <div className="opacity-60 text-sm">
            {`Expires ${moment(
              `${card?.exp_year}-${card?.exp_month}-02`
            ).format("MMM YYYY")}`}
          </div>
        </div>
      </summary>
      <div className="mb-4 ml-[50px]">
        <div className="opacity-90 flex gap-3">
          <div className="opacity-60 flex-1">Name:</div>
          <div className="flex-1">{card?.billing_address?.name}</div>
        </div>
        <div className="opacity-90 flex gap-3">
          <div className="opacity-60 flex-1">Number:</div>
          <div className="flex-1">{`****${card?.last4}`}</div>
        </div>
        <div className="opacity-90 flex gap-3">
          <div className="opacity-60 flex-1">Expires:</div>
          <div className="flex-1">{card?.expiry}</div>
        </div>
        <div className="opacity-90 flex gap-3">
          <div className="opacity-60 flex-1">Type:</div>
          <div className="flex-1 capitalize">{card?.funding}</div>
        </div>
        <div className="opacity-90 flex gap-3 mt-5">
          <div className="opacity-60 flex-1">Billing Address:</div>
          <div className="flex-1 capitalize">
            {card?.billing_address?.address?.line1}
          </div>
        </div>
        <div className="opacity-90 flex gap-3">
          <div className="opacity-60 flex-1">Email:</div>
          <div className="flex-1 capitalize">
            {card?.billing_address?.email}
          </div>
        </div>
        <div className="opacity-90 flex gap-3">
          <div className="opacity-60 flex-1">Phone:</div>
          <div className="flex-1 capitalize">
            {card?.billing_address?.phone || "-"}
          </div>
        </div>
        <div className="opacity-90 flex gap-3">
          <div className="opacity-60 flex-1">CVC Check:</div>
          <div className="flex-1 capitalize">
            {card?.checks?.cvc_check === "pass" ? (
              <FaCheckCircle fill="green" />
            ) : (
              <MdCancel fill="red" />
            )}
          </div>
        </div>
      </div>
    </details>
  );
};

export default PaymentMethod;
