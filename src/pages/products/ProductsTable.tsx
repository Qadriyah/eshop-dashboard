"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import Dropdown from "../../components/Dropdown";
import ConfirmationModel from "../../modals/ConfimationModel";
import ShouldRender from "../../components/ShouldRender";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useRouter } from "next/navigation";

type TableProductProps = {
  products: any[];
  onDeleteProduct: () => void;
  getProductId?: (productId: string) => void;
  openModal: boolean;
  closeModalFn: () => void;
  openModalFn: () => void;
  productID?: string;
};

const ProductsTable: React.FC<TableProductProps> = ({
  products,
  onDeleteProduct,
  getProductId,
  productID,
  openModal,
  closeModalFn,
  openModalFn,
}): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement>,
    productId: string
  ) => {
    setAnchorEl(event.currentTarget);
    getProductId?.(productId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    openModalFn();
  };

  // ant design
  interface DataProps {
    key?: string;
    discountType: string;
    percentDiscount: number | number[];
    fixedDiscount: string | number;
    name: string;
    price: number | string;
    discount?: string | number;
    description?: any;
    quantity?: number;
    stock?: number;
    allowBackorders?: boolean;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    icon?: string;
    images?: string[];
    sku?: string | number;
    status: string;
    id: string;
  }
  const columns: TableProps<DataProps>["columns"] = [
    {
      title: "Product",
      key: "product",
      dataIndex: "product",
      render: (_, item) => (
        <div className="flex">
          <img
            src={item.icon}
            alt=""
            className="w-[40px] h-[40px] rounded-md mr-2"
          />
          <div className="font-semibold text-sm opacity-90 mb-0 translate-y-2">
            {item.name}
          </div>
        </div>
      ),
    },
    {
      title: "Sku",
      key: "sku",
      dataIndex: "sku",
      render: (_, item) => (
        <h2 className="font-semibold text-black opacity-60 hover:text-[#3875d7]">
          {item.sku}
        </h2>
      ),
    },
    // {
    //   title: "Qty",
    //   key: "qty",
    //   dataIndex: "qty",
    //   render: (_, item) => (
    //     <p className="font-semibold text-black opacity-60 hover:text-[#3875d7]">
    //       {item.qty}
    //     </p>
    //   ),
    // },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (_, item) => (
        <NumericFormat
          value={item.price}
          prefix={"$"}
          thousandSeparator=","
          displayType="text"
          className="font-semibold"
        />
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, item) => (
        <div
          className={`opacity-70 text-center p-1 rounded-lg font-semibold text-xs ${
            item.status === "Inactive"
              ? "text-[#f18d9d] bg-[#f7d0d6]"
              : item.status === "Published"
              ? "text-[#5ced73] bg-[#abf7b1]"
              : "text-[#75bfec] bg-[#dff2ff]"
          }`}
        >
          {item.status}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, item) => (
        <Dropdown
          anchorEl={anchorEl}
          handleClick={(event) => handleClick(event, item.id)}
          handleClose={handleClose}
          id={`image-${item.id}`}
          open={open}
          title="Actions"
        >
          <div className="w-[150px]">
            <ul>
              <li
                className="hover:bg-[#f0f0f1] p-2 cursor-pointer"
                onClick={() => {
                  navigate.push(`/dashboard/products/${productID}`);
                  handleClose();
                }}
              >
                Edit
              </li>
              <li
                className="hover:bg-[#f0f0f1] p-2 cursor-pointer"
                onClick={() => {
                  openModalFn();
                  handleClose();
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-scroll w-full">
        <div className="min-w-[700px] hide-scrollbar">
          <Table
            columns={columns}
            dataSource={products}
            className="hide-scrollbar"
          />
        </div>
      </div>
      <ShouldRender visible={openModal}>
        <ConfirmationModel
          title="Delete Product"
          message="Are you sure you want to delete this product?"
          open={openModal}
          onConfirm={onDeleteProduct}
          handleClose={closeModalFn}
        />
      </ShouldRender>
    </>
  );
};

export default ProductsTable;
