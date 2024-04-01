import React from "react";
import { LineItem } from "./ProductOrders";
import { formatCurrency } from "@/utils/helpers";

type IProps = {
  products: LineItem[];
};

const ExpandableRow: React.FC<IProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="font-bold">Product Name</div>
      <div className="text-center font-bold">Quantity</div>
      <div className="text-right font-bold">Price</div>
      <div className="text-right font-bold">Amount</div>
      {products.map((product) => (
        <React.Fragment key={product.key}>
          <div>{product.name}</div>
          <div className="text-center">{product.quantity}</div>
          <div className="text-right">{formatCurrency(product.price)}</div>
          <div className="text-right">
            {formatCurrency(product.quantity * product.price)}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ExpandableRow;
