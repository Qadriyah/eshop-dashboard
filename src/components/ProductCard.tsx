import React, { PropsWithChildren, HTMLAttributes } from "react";

type ProductCardProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    title: string;
    showStatus?: boolean;
  };

const ProductCard: React.FC<ProductCardProps> = ({
  children,
  title,
  showStatus = false,
}): JSX.Element => {
  return (
    <div className="card-content rounded-lg p-5 bg-white mb-5">
      <div className="flex justify-between">
        <h2 className="text-[26px] font-bold mb-4 opacity-90 text-[#152238]">
          {title}
        </h2>
        <div
          className={`w-[17px] h-[17px] rounded-full bg-green-500 ${
            !showStatus ? "hidden" : "block"
          }`}
        ></div>
      </div>
      {children}
    </div>
  );
};

export default ProductCard;
