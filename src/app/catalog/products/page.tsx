"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Card from "@/components/Card";
import SelectComponent from "@/components/SelectComponent";
import Button from "@/components/Button";
import ProductsTable from "@/app/catalog/products/ProductList";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Suspense from "@/components/Suspense";
import { ProductType } from "@/types/entities";
import { getProducts } from "@/api/actions/product";

const Products: React.FC<{}> = (): JSX.Element => {
  const navigate = useRouter();
  const [status, setStatus] = React.useState<string>("all");
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState<ProductType[]>(
    []
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  // const mutation = useMutation({
  //   mutationKey: ["productd", productId],
  //   mutationFn: () => deleteApi({ url: `/products/${productId}` }),
  // });

  const handleChange = (event: SelectChangeEvent): void => {
    const { value } = event.target;
    setStatus(value);
    switch (value) {
      case "all":
        setFilteredProducts(products);
        break;
      case "Active":
      case "Inactive":
        setFilteredProducts(() =>
          products.filter((product) => product.status === value)
        );
        break;
      default:
        break;
    }
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (!value) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts((prevState) =>
        prevState.filter((product) =>
          product.name?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase())
        )
      );
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(searchQuery, ":::::");
  };

  React.useEffect(() => {
    setProducts(data?.products || []);
    setFilteredProducts(data?.products || []);
  }, [data?.products]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
        Products
      </h2>
      <Card>
        <div className="w-full">
          <div className="flex justify-between mb-8 h-10">
            <form onSubmit={handleSearch}>
              <div className="flex items-center">
                <input
                  type="text"
                  name="product"
                  value={searchQuery}
                  onChange={onSearch}
                  className="bg-[#f1f0f0] p-2 pl-4 outline-none rounded-tl-md rounded-bl-md min-w-[200px] w-full"
                  placeholder="Search Product"
                />
                <button
                  className="p-2 bg-[#f1f0f0] rounded-tr-md rounded-br-md hover:bg-white hover:border-2 hover:border-[#f1f0f0]"
                  type="submit"
                >
                  <IoSearchOutline size={22} fill="gray" />
                </button>
              </div>
            </form>
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
                onClick={() => navigate.push("/catalog/products/add")}
              >
                Add Product
              </Button>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="p-20 w-full flex items-center justify-center">
                <Loader color="text-black" />
              </div>
            }
            loading={isLoading}
          >
            <ProductsTable
              products={filteredProducts}
              refetchProducts={refetch}
            />
          </Suspense>
        </div>
      </Card>
    </div>
  );
};

export default Products;
