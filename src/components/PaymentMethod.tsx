import React, { DetailsHTMLAttributes } from "react";

type PaymentMethodProps = DetailsHTMLAttributes<HTMLDetailsElement> & {
  image: string;
  paymentName: string;
  expiry: string;
  customerName: string;
  number: number | string;
  expireType: string;
  phoneNumber: number | string;
  issureID: string;
  billingAddress: string;
  email: string;
  origin: string;
  passed: any;
};

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  image,
  paymentName,
  expiry,
  customerName,
  number,
  expireType,
  phoneNumber,
  issureID,
  billingAddress,
  email,
  origin,
  passed,
}): JSX.Element => {
  return (
    <details className="mt-5 outline-none pb-1 mb-4 border-b border-dashed border-[#d8d2d2]">
      <summary className="flex hover:font-bold cursor-pointer">
        <img src={image} alt="" className="[w-23px] h-[12px] mr-3" />
        <div className="-translate-y-4">
          <p className="font-semibold opacity-80">{paymentName}</p>
          <p className="opacity-60 text-sm -mt-1">{expiry}</p>
        </div>
      </summary>
      <div className="flex justify-between flex-col lg:flex-row">
        <div>
          <p className="font-semibold opacity-90">
            <span className="opacity-60">Name: </span>
            {customerName}
          </p>
          <p className="font-semibold opacity-90">
            <span className="opacity-60">Number: </span>
            {number}
          </p>
          <p className="font-semibold opacity-90">
            <span className="opacity-60">Expires type: </span>
            {expireType}
          </p>
          <p className="font-semibold opacity-90">
            <span className="opacity-60">Issuer ID: </span>
            {issureID}
          </p>
        </div>
        <div>
          <p className="font-semibold opacity-90">
            <span className="opacity-60">Billing Address: </span>
            {billingAddress}
          </p>
          <p className="font-semibold opacity-90">
            <span className="opacity-60">Phone: </span>
            {phoneNumber}
          </p>
          <p className="font-semibold opacity-90">
            <span className="opacity-60">Email: </span>
            {email}
          </p>
          <p className="font-semibold opacity-90">
            <span className="opacity-60">Origin: </span>
            {origin}
          </p>
          <p className="font-semibold opacity-90">
            <span className="opacity-60">Passed: </span>
            {passed}
          </p>
        </div>
      </div>
    </details>
  );
};

export default PaymentMethod;
