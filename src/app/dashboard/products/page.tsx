"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSelectorHook } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store/store";
import Card from "@/components/Card";
import SelectComponent from "@/components/SelectComponent";
import Button from "@/components/Button";
import ProductsTable from "@/pages/products/ProductsTable";
import { useRouter } from "next/navigation";

const Products: React.FC<{}> = (): JSX.Element => {
  const [product, setProduct] = React.useState<any>("");
  const [status, setStatus] = React.useState<string>("all");
  const navigate = useRouter();

  // get the products
  const products = useSelectorHook((state: RootState) => state.products);
  const [renderProducts, setRenderProducst] = React.useState<any[]>(products);

  //   const productsByName = products.map((product) =>
  //     product.productName.includes(product as any)
  //   );
  // console.log(productsByName, "????");

  const filterByStatus = products.filter(
    (product) => product.status === status
  );

  React.useEffect(() => {
    if (status === "all" || status === "") {
      setRenderProducst(products);
    } else {
      setRenderProducst(filterByStatus);
    }
  }, [product, status]);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
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
                  value={product}
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
                  <MenuItem value={"Published"}>Published</MenuItem>
                  <MenuItem value={"Scheduled"}>Scheduled</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  <MenuItem value={"Draft"}>Draft</MenuItem>
                </SelectComponent>
                <Button
                  className="p-2 add-pdt hover:opacity-70 text-white ml-3 font-semibold text-center bg-[#3875d7] rounded-md w-[150px]"
                  onClick={() => navigate.push("/dashboard/products/add")}
                >
                  Add Product
                </Button>
              </div>
            </div>
            <ProductsTable products={renderProducts} />
          </div>
        </Card>
      </div>
    </div>
  );
};

// [#3875d7]
export default Products;
