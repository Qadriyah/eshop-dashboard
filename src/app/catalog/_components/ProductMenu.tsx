import { ProductType } from "@/types/entities";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";
import { CgMoreVerticalO } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

type IProps = {
  product: ProductType;
  onDeleteProduct: (product: ProductType) => void;
};

const ProductMenu: React.FC<IProps> = ({ product, onDeleteProduct }) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={`/catalog/products/edit/${product.id}`}>
          <div className="flex gap-2 items-center">
            <FiEdit3 />
            <div>Edit</div>
          </div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex gap-2 items-center">
          <RiDeleteBin6Line />
          <div>Delete</div>
        </div>
      ),
      onClick: () => onDeleteProduct(product),
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

export default ProductMenu;
