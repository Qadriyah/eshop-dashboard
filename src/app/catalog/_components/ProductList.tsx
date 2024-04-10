"use client";

import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import ShouldRender from "../../../components/ShouldRender";
import { ProductType } from "@/types/entities";
import { formatCurrency, notify } from "@/utils/helpers";
import ConfirmationModal from "@/modals/ConfirmationModal";
import ProductMenu from "./ProductMenu";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { deleteProduct } from "@/api/actions/product";
import { DISCOUNT_TYPES, PRODUCT_STATUS } from "@/utils/constants";

type IProps = {
  products: ProductType[];
  refetchProducts: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
};

const ProductList: React.FC<IProps> = ({
  products,
  refetchProducts,
}): JSX.Element => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedProduct, setSelecetedProduct] =
    React.useState<ProductType | null>(null);

  const deleteProductMutation = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (productId: string) => deleteProduct(productId),
  });

  const onDeleteProduct = async (product: ProductType) => {
    setSelecetedProduct(product);
    setShowModal(true);
  };

  const confirmDeleteProduct = async () => {
    if (!selectedProduct) {
      return;
    }

    const { errors, message } = await deleteProductMutation.mutateAsync(
      selectedProduct.id
    );

    if (errors) {
      notify(errors[0].message, "error");
      return;
    }
    notify(message, "success");
    refetchProducts();
    setShowModal(false);
  };

  const columns: TableProps<ProductType>["columns"] = [
    {
      title: "Product",
      key: "product",
      dataIndex: "product",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div className="flex gap-5 h-[40px] items-center">
          <div
            className="rounded-md border border-gray-300"
            style={{
              backgroundImage: `url(${
                item.icon || "/assets/images/image.svg"
              })`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: 50,
              width: 50,
            }}
          >
            &nbsp;
          </div>
          <div>{item.name}</div>
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      className: "text-[1.063rem]",
      align: "right",
      render: (_, item) => {
        let price = item.price;
        if (item.discountType === DISCOUNT_TYPES.fixed) {
          price = item.price + item.fixedDiscount;
        }
        if (item.discountType === DISCOUNT_TYPES.percentage) {
          price = item.price + (item.percentDiscount / 100) * item.price;
        }
        return <div>{formatCurrency(price, true)}</div>;
      },
    },
    {
      title: "Discount",
      key: "discount",
      dataIndex: "discount",
      className: "text-[1.063rem]",
      align: "right",
      render: (_, item) => {
        const discount =
          item.discountType === DISCOUNT_TYPES.percentage
            ? (item.percentDiscount * item.price) / 100
            : item.discountType === DISCOUNT_TYPES.fixed
            ? item.fixedDiscount
            : 0;
        return (
          <div>
            {item.discountType === DISCOUNT_TYPES.percentage ? (
              <div className="flex gap-2 justify-end">
                <p className="opacity-45">{`(${item.percentDiscount}%)`}</p>
                <p>{formatCurrency(discount, true)}</p>
              </div>
            ) : (
              formatCurrency(discount, true)
            )}
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      className: "text-[1.063rem] flex justify-center",
      align: "center",
      render: (_, item) => (
        <div
          className={`text-center px-1 rounded-lg w-[100px] ${
            item.status === PRODUCT_STATUS.inactive
              ? "text-red-600 bg-red-200 border border-red-600"
              : item.status === PRODUCT_STATUS.active
              ? "text-green-600 bg-green-200 border border-green-600"
              : "text-blue-600 bg-blue-200 border border-blue-600"
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
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div className="flex justify-center items-center">
          <ProductMenu product={item} onDeleteProduct={onDeleteProduct} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-scroll w-full">
        <div className="min-w-[700px] hide-scrollbar">
          <Table
            columns={columns}
            dataSource={products?.map((product) => ({
              ...product,
              key: product.id,
            }))}
            className="hide-scrollbar"
          />
        </div>
      </div>
      <ShouldRender visible={showModal}>
        <ConfirmationModal
          title="Delete Product"
          message="Are you sure you want to delete this product?"
          open={showModal}
          handleOk={confirmDeleteProduct}
          handleClose={() => setShowModal(false)}
        />
      </ShouldRender>
    </>
  );
};

export default ProductList;
