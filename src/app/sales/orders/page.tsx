"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSelectorHook } from "@/redux/hooks/hooks";
import Card from "@/components/Card";
import SelectComponent from "@/components/SelectComponent";
import OrdersTable from "@/pages/orders/OrdersTable";

const Orders: React.FC<{}> = (): JSX.Element => {
  const [order_, setOrder] = React.useState<string>("");
  const [status, setStatus] = React.useState("all");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  // get orders
  const orders: any[] = useSelectorHook((state) => state.orders);
  const [renderOrders, setRenderOrders] = React.useState<any[]>(orders);

  const ordersByName = orders.filter((order) =>
    order.customer.customerName
      .toLocaleLowerCase()
      .includes(order_.toLocaleLowerCase())
  );
  const filterByStatus = orders.filter((order) => order.status === status);

  React.useEffect(() => {
    if (order_ === "") {
      if (status === "all" || status === "") {
        setRenderOrders(orders);
      } else {
        setRenderOrders(filterByStatus);
      }
    }
    if (order_ !== "") {
      setRenderOrders(ordersByName);
    }
  }, [order_, status]);

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
                  value={order_}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setOrder(event.target.value)
                  }
                  className="bg-[#f1f0f0] placeholder:font-senibold p-2 pl-8 outline-none rounded-md w-1/2 max-w-[400px] min-w-[200px]"
                  placeholder="Search Order"
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
                  <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                  <MenuItem value={"Denied"}>Denied</MenuItem>
                  <MenuItem value={"Expired"}>Expired</MenuItem>
                  <MenuItem value={"Failed"}>Failed</MenuItem>
                  <MenuItem value={"Pending"}>Pending</MenuItem>
                  <MenuItem value={"Processing"}>Processing</MenuItem>
                  <MenuItem value={"Refunded"}>Refunded</MenuItem>
                  <MenuItem value={"Delivered"}>Delivered</MenuItem>
                  <MenuItem value={"Delivering"}>Delivering</MenuItem>
                </SelectComponent>
              </div>
            </div>
            <OrdersTable orders={renderOrders} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
