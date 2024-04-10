"use client";

import React from "react";
import Card from "@/components/Card";
import CustomerTable from "../_components/CustomerTable";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/actions/customer";
import { UserType } from "@/types/entities";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import { USER_ROLES } from "@/utils/constants";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";

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
            customer.profile?.fullName
              ?.toLocaleLowerCase()
              ?.includes(query.toLocaleLowerCase()) ||
            customer.email
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase())
        )
      );
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(query, ":::::");
  };

  React.useEffect(() => {
    setCustomers(data?.users || []);
    setFilteredCustomers(data?.users || []);
  }, [data?.users]);

  return (
    <div>
      <PageHeader title="Customers" />
      <Card>
        <div className="flex gap-5 mb-5">
          <div className="">
            <SearchBar
              searchQuery={query}
              handleSearch={handleSearch}
              onChange={onSearchCustomer}
            />
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
