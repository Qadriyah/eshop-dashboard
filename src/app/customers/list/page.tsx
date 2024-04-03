"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import Card from "@/components/Card";
import CustomerTable from "../_components/CustomerTable";
import { useQuery } from "@tanstack/react-query";
import { getCustomers, getUsers } from "@/api/actions/customer";
import { UserType } from "@/types/entities";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import { USER_ROLES } from "@/utils/constants";
import PageHeader from "@/components/PageHeader";

const CustomerListing: React.FC = (): JSX.Element => {
  const [query, setQuery] = React.useState<string>("");
  const [customers, setCustomers] = React.useState<UserType[]>([]);
  const [filteredCustomers, setFilteredCustomers] = React.useState<UserType[]>(
    []
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getUsers({ user: USER_ROLES.CUSTOMER }),
  });

  const onSearchCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    if (!value) {
      setFilteredCustomers(customers);
    } else {
      setFilteredCustomers(() =>
        filteredCustomers.filter(
          (customer) =>
            customer.profile.fullName
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()) ||
            customer.email
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase())
        )
      );
    }
  };

  React.useEffect(() => {
    setCustomers(data?.users || []);
    setFilteredCustomers(data?.users || []);
  }, [data?.users]);

  return (
    <div>
      <PageHeader title="Customers" />
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
                value={query}
                onChange={onSearchCustomer}
                className="bg-[#f1f0f0] p-2 pl-8 outline-none rounded-md w-full"
                placeholder="Search Customers"
              />
            </span>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-52">
              <Loader color="black" />
            </div>
          }
          loading={isLoading}
        >
          <CustomerTable customers={filteredCustomers} refetch={refetch} />
        </Suspense>
      </Card>
    </div>
  );
};

export default CustomerListing;
