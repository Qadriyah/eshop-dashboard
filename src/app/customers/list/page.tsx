"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Card from "@/components/Card";
import SelectComponent from "@/components/SelectComponent";
import CustomerTable from "@/pages/customer/CustomerTable";
import { useQuery } from "@tanstack/react-query";
import { Customers, getCustomers } from "@/api/actions/customer";

const CustomerListing: React.FC<{}> = (): JSX.Element => {
  const [customerName, setCustomerName] = React.useState<string>("");
  // const [status, setStatus] = React.useState("All");

  // get customers
  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
  });

  const [customers, setCustomers] = React.useState<Customers[]>([]);
  const [filteredCustomers, setFilteredCustomers] = React.useState<Customers[]>(
    []
  );

  const handleCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(event.target.value);
    if (!customerName) {
      setFilteredCustomers(customers);
    }
    setFilteredCustomers(() =>
      customers.filter((customer) =>
        customer.profile.fullName
          .toLocaleLowerCase()
          .includes(customerName.toLocaleLowerCase())
      )
    );
  };

  // const handleChange = (event: SelectChangeEvent) => {
  //   setStatus(event.target.value as string);
  // };

  React.useEffect(() => {
    setCustomers(data?.users || []);
    setFilteredCustomers(data?.users || []);
  }, [data?.users]);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
          Customers
        </h2>
        <Card>
          <div className="w-full">
            <div className="products flex justify-between mb-8 w-full">
              <span className="-mt-5 w-full">
                <IoSearchOutline
                  size={20}
                  fill="gray"
                  className="translate-y-8 translate-x-2 opacity-50"
                />
                <input
                  type="text"
                  name="product"
                  value={customerName}
                  onChange={handleCustomer}
                  className="bg-[#f1f0f0] p-2 pl-8 outline-none rounded-md w-full"
                  placeholder="Search Customers"
                />
              </span>
              {/* <div className="flex status-add-product">
                <SelectComponent
                  // handleChange={handleChange}
                  variant="outlined"
                  label="Status"
                  value={status}
                  defaultValue="All"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Locked"}>Locked</MenuItem>
                </SelectComponent>
              </div> */}
            </div>
          </div>
          <CustomerTable customers={filteredCustomers} />
        </Card>
      </div>
    </div>
  );
};

// [#3875d7]

export default CustomerListing;
