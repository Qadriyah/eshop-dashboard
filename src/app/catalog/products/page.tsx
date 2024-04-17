"use client";

import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Card from "@/components/Card";
import SelectComponent from "@/components/SelectComponent";
import Button from "@/components/Button";
import ProductsTable from "@/app/catalog/_components/ProductList";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Suspense from "@/components/Suspense";
import { ProductType } from "@/types/entities";
import { getProducts } from "@/api/actions/product";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import { PRODUCT_STATUS } from "@/utils/constants";

const Products: React.FC<{}> = (): JSX.Element => {
  const navigate = useRouter();
  const [status, setStatus] = React.useState<string>("Active");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<ProductType[]>(
    []
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({}),
  });

  const handleChange = (event: SelectChangeEvent<any>): void => {
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
    setFilteredProducts(
      data?.products?.filter(
        (product) => product.status === PRODUCT_STATUS.active
      ) || []
    );
  }, [data?.products]);

  return (
    <div>
      <PageHeader title="Products" />
      <Card>
        <div className="flex flex-col gap-5 mb-8 lg:flex-row w-full">
          <div className="flex-1">
            <SearchBar
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              onChange={onSearch}
            />
          </div>
          <div className="flex-1 hidden xl:block" />
          <div className="flex gap-5 flex-1">
            <div className="flex-1">
              <SelectComponent
                onChange={handleChange}
                label="Status"
                variant="outlined"
                value={status}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Inactive"}>Inactive</MenuItem>
              </SelectComponent>
            </div>
            <div className="">
              <Button
                className="p-2 hover:opacity-70 text-white text-center bg-[#3875d7] rounded-md"
                onClick={() => navigate.push("/catalog/products/add")}
              >
                Add Product
              </Button>
            </div>
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
      </Card>
    </div>
  );
};

export default Products;
