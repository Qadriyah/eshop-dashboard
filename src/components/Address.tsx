import React, { HTMLAttributes } from "react";
import ProductCard from "./ProductCard";
import { AddressType } from "@/types/entities";

type AddressProps = HTMLAttributes<HTMLDivElement> & {
  paragraph: string;
  icon: any;
  title: string;
  address: AddressType;
};

const Address: React.FC<AddressProps> = ({
  paragraph,
  icon,
  title,
  address,
  ...props
}): JSX.Element => {
  return (
    <ProductCard title={title} showStatus={true}>
      <div className="flex">
        <div className="flex-1">
          <div>{`${address?.line1}, ${address?.line2}`}</div>
          <div>{`${address?.city}, ${address?.state} ${address?.postal_code}`}</div>
          <div>{address?.country}</div>
        </div>
        <div>{icon}</div>
      </div>
    </ProductCard>
  );
};

export default Address;
