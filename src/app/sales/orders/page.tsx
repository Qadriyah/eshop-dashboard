"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Card from "@/components/Card";
import SelectComponent from "@/components/SelectComponent";
import OrdersTable from "@/pages/orders/OrdersTable";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "@/api/actions/sales";
import { SaleType } from "@/types/entities";
import { getUsers } from "@/api/actions/customer";

const Orders: React.FC<{}> = (): JSX.Element => {
  const [sale, setSale] = React.useState<string>("");
  const [status, setStatus] = React.useState("all");
  const [sales, setSales] = React.useState<SaleType[]>([]);
  const [filteredSales, setFilteredSales] = React.useState<SaleType[]>([]);
  // get sales
  const { data, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(),
  });
  console.log(data?.sales, ";;;;;;;");

  const handleChange = (event: SelectChangeEvent<any>) => {
    const { value } = event.target;
    setStatus(value);
    switch (value) {
      case "all":
        setFilteredSales(sales);
        break;
      case "Cancelled":
      case "Completed":
      case "Pending":
      case "Refunded":
      case "Delivered":
      case "Processing":
      case "Delivering":
        setFilteredSales(() => sales.filter((sale) => sale.status === value));
        break;
      default:
        setFilteredSales([]);
        break;
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSale(value);
    if (!value) {
      setFilteredSales(sales);
    } else {
      setFilteredSales(() =>
        sales.filter((sale) =>
          sale.user?.email
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        )
      );
    }
  };

  React.useEffect(() => {
    setFilteredSales(data?.sales as SaleType[]);
    setSales(data?.sales as SaleType[]);
  }, [data?.sales]);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
          Orders
        </h2>
        <Card>
          <div className="w-full hide-scrollbar">
            <div className="products flex justify-between mb-8">
              <span className="-mt-5">
                <IoSearchOutline
                  size={20}
                  fill="#d3d3d3"
                  className="translate-y-8 translate-x-1"
                />
                <input
                  type="text"
                  name="order"
                  value={sale}
                  onChange={onChange}
                  className="bg-[#f1f0f0] placeholder:font-senibold p-2 pl-8 outline-none rounded-md w-1/2 max-w-[400px] min-w-[200px]"
                  placeholder="Search Order"
                />
              </span>
              <div className="flex status-add-product">
                <SelectComponent
                  onChange={handleChange}
                  variant="outlined"
                  label="Status"
                  value={status}
                  defaultValue="all"
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                  <MenuItem value={"Pending"}>Pending</MenuItem>
                  <MenuItem value={"Processing"}>Processing</MenuItem>
                  <MenuItem value={"Refunded"}>Refunded</MenuItem>
                  <MenuItem value={"Delivered"}>Delivered</MenuItem>
                  <MenuItem value={"Delivering"}>Delivering</MenuItem>
                </SelectComponent>
              </div>
            </div>
            <OrdersTable orders={filteredSales} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
