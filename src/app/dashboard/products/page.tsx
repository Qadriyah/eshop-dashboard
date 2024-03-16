"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Card from "@/components/Card";
import SelectComponent from "@/components/SelectComponent";
import Button from "@/components/Button";
import ProductsTable from "@/pages/products/ProductsTable";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, getApi } from "@/api";

// type ProductProps = {
//   discountType: string;
//   percentDiscount: number | number[];
//   fixedDiscount: string | number;
//   name: string;
//   price: number | string;
//   discount?: string | number;
//   description?: any;
//   quantity?: number;
//   stock?: number;
//   allowBackorders?: boolean;
//   weight?: number;
//   length?: number;
//   width?: number;
//   height?: number;
//   icon?: string;
//   images?: string[];
//   sku?: string | number;
//   status: string;
//   id?: string;
//   key?: string;
// };

const Products: React.FC<{}> = (): JSX.Element => {
  const [product_, setProduct] = React.useState<any>("");
  const [status, setStatus] = React.useState<string>("all");
  const navigate = useRouter();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [productId, setProductId] = React.useState<string>("");

  // get the products
  const { data, isLoading, isError, error }: any = useQuery({
    queryKey: ["products"],
    queryFn: () => getApi({ url: "/products" }),
  });
  // console.log(data?.products, ">>>>>");

  const [renderProducts, setRenderProducst] = React.useState<any[]>(
    data?.products
  );

  const productsByName = renderProducts?.filter((product) =>
    product.name.toLocaleLowerCase().includes(product_.toLocaleLowerCase())
  );

  const filterByStatus = renderProducts?.filter(
    (product) => product.status === status
  );

  React.useEffect(() => {
    setRenderProducst((prevState) => ({
      ...prevState,
      key: `${Math.round(Math.random() * 10000)}`,
    }));
  }, []);

  React.useEffect(() => {
    // setRenderProducst(myProducts.data?.products);
    if (product_ === "") {
      if (status === "all" || status === "") {
        setRenderProducst(renderProducts);
      } else {
        setRenderProducst(filterByStatus);
      }
    }
    if (product_ !== "") {
      setRenderProducst(productsByName);
    }
  }, [product_, status]);

  const handleChange = (event: SelectChangeEvent): void => {
    setStatus(event.target.value as string);
  };

  const getProductId = (id: string): void => setProductId(id);

  const mutation = useMutation({
    mutationKey: ["productd", productId],
    mutationFn: () => deleteApi({ url: `/products/${productId}` }),
  });

  const onDeleteProduct = (): void => {
    if (mutation.isError) {
      console.log(mutation.error);
    }
    mutation.mutate();
    console.log(mutation.data, ">>>>>>>>>");

    setOpenModal(false);
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
          Products
        </h2>
        <Card>
          <div className="w-full">
            <div className="products flex justify-between mb-8">
              <span className="-mt-5">
                <IoSearchOutline
                  size={20}
                  fill="gray"
                  className="translate-y-8 translate-x-2"
                />
                <input
                  type="text"
                  name="product"
                  value={product_}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setProduct(event.target.value)
                  }
                  className="bg-[#f1f0f0] p-2 pl-8 outline-none rounded-md min-w-[200px] w-full"
                  placeholder="Search Product"
                />
              </span>
              <div className="flex status-add-product">
                <SelectComponent
                  handleChange={handleChange}
                  label="Status"
                  value={status}
                  defaultValue="all"
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                </SelectComponent>
                <Button
                  className="p-2 add-pdt hover:opacity-70 text-white ml-3 font-semibold text-center bg-[#3875d7] rounded-md w-[150px]"
                  onClick={() => navigate.push("/dashboard/products/add")}
                >
                  Add Product
                </Button>
              </div>
            </div>
            {isLoading ? (
              <h2 className="text-center font-semibold">Loading...</h2>
            ) : isError ? (
              <h2>{error.message}</h2>
            ) : (
              <ProductsTable
                products={renderProducts}
                openModal={openModal}
                closeModalFn={() => setOpenModal(false)}
                onDeleteProduct={onDeleteProduct}
                openModalFn={() => setOpenModal(true)}
                getProductId={getProductId}
                productID={productId}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Products;
