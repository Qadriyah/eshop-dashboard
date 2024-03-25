import React, { HTMLAttributes } from "react";
import ProductCard from "./ProductCard";

type AddressProps = HTMLAttributes<HTMLDivElement> & {
  paragraph: string;
  icon: any;
  title: string;
};

const Address: React.FC<AddressProps> = ({
  paragraph,
  icon,
  title,
  ...props
}): JSX.Element => {
  return (
    <div {...props}>
      <ProductCard title={title} showStatus={true}>
        <div className="flex justify-between">
          <p className="w-[200px] opacity-80">{paragraph}</p>
          {icon}
        </div>
      </ProductCard>
    </div>
  );
};

export default Address;
