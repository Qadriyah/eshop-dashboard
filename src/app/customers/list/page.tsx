"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSelectorHook } from "@/redux/hooks/hooks";
import Card from "@/components/Card";
import SelectComponent from "@/components/SelectComponent";
import CustomerTable from "@/pages/customer/CustomerTable";

const CustomerListing: React.FC<{}> = (): JSX.Element => {
  const [customerName, setCustomerName] = React.useState<string>("");
  const [status, setStatus] = React.useState("All");

  // get customers
  // const customers = useSelectorHook((state) => state.customers);
  const [myCustomers, setMyCustomers] = React.useState<any[]>([]);

  // const customersByNames = customers?.filter((customer) =>
  //   customer.name.toLocaleLowerCase().includes(customerName.toLocaleLowerCase())
  // );
  // const customersByStatus = customers.filter(
  //   (customer) => customer.status === status
  // );

  // React.useEffect(() => {
  //   if (customerName !== "") {
  //     setMyCustomers(customersByNames);
  //   }
  //   if (customerName === "") {
  //     if (customerName === "" || status === "All") {
  //       setMyCustomers(customers);
  //     }
  //     if (status !== "All") {
  //       setMyCustomers(customersByStatus);
  //     }
  //   }
  // }, [customerName, status]);

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
                  className="translate-y-8 translate-x-2 opacity-50"
                />
                <input
                  type="text"
                  name="product"
                  value={customerName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setCustomerName(event.target.value)
                  }
                  className="bg-[#f1f0f0] p-2 pl-8 outline-none rounded-md w-1/2 min-w-[200px]"
                  placeholder="Search Customers"
                />
              </span>
              <div className="flex status-add-product">
                <SelectComponent
                  handleChange={handleChange}
                  label="Status"
                  value={status}
                  defaultValue="All"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Locked"}>Locked</MenuItem>
                </SelectComponent>
              </div>
            </div>
          </div>
          <CustomerTable customers={myCustomers} />
        </Card>
      </div>
    </div>
  );
};

// [#3875d7]

export default CustomerListing;
