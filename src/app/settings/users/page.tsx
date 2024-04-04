"use client";

import { getUsers } from "@/api/actions/customer";
import Card from "@/components/Card";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import Suspense from "@/components/Suspense";
import { UserType } from "@/types/entities";
import { USER_ROLES } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Table, TableProps } from "antd";
import moment from "moment";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const Users: React.FC = (): JSX.Element => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ user: USER_ROLES.ADMIN }),
  });
  const [users, setUsers] = React.useState<UserType[]>([]);
  const [queryName, setQueryName] = React.useState<string>("");
  const [filteredUsers, setFilteredUsers] = React.useState<UserType[]>([]);

  React.useEffect(() => {
    setUsers(data?.users!);
    setFilteredUsers(data?.users!);
  }, [data?.users]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setQueryName(value);
    if (value === "") {
      setFilteredUsers(data?.users!);
    }
    setFilteredUsers(() =>
      users?.filter((user) =>
        user?.profile?.fullName
          ?.toLocaleLowerCase()
          ?.includes(value.toLocaleLowerCase())
      )
    );
  };

  const columns: TableProps<UserType>["columns"] = [
    {
      key: "customer_name",
      title: "Customer name",
      dataIndex: "customer_name",
      render: (_, item) => (
        <div
          className="text-[1.063rem] opacity-90 mb-0 cursor-pointer hover:text-blue-400"
          // onClick={() => navigate.push(`/customers/${item.id}`)}
        >
          {item.profile.fullName}
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      render: (_, item) => (
        <div className="text-black text-[1.063rem] opacity-60 hover:text-[#3875d7]">
          {item.email}
        </div>
      ),
    },
    {
      key: "roles",
      title: "Roles",
      dataIndex: "roles",
      render: (_, item) => (
        <div className="flex gap-2">
          {item?.roles?.map((role) => (
            <div
              key={role}
              className={`px-2 bg-blue-200 border text-blue-600 border-blue-600 text-[1.063rem] text-center rounded-md`}
            >
              {role}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (_, item) => (
        <div
          className={`px-2 text-[1.063rem] text-center rounded-md ${
            item.deleted
              ? "text-red-600 bg-red-200 border border-red-600"
              : item.suspended
              ? "text-orange-600 bg-orange-200 border border-orange-600"
              : "text-green-600 bg-green-200 border border-green-600"
          }`}
        >
          {item.deleted ? "Banned" : item.suspended ? "Suspended" : "Active"}
        </div>
      ),
    },
    {
      key: "created_date",
      title: "Created date",
      dataIndex: "created_date",
      render: (_, item) => (
        <div className="text-black text-[1.063rem] opacity-60">
          {moment(item.profile.createdAt).format("MM/DD/YYYY")}
        </div>
      ),
    },
    // {
    //   key: "actions",
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (_, item) => (
    //     <DropMenu
    //       customer={item}
    //       handleOpenDeleteModal={(customer: UserType) => {
    //         setCustomer(customer);
    //         setOpenDeleteModal(true);
    //       }}
    //       handleOpenSuspendModal={(customer: UserType) => {
    //         setCustomer(customer);
    //         setOpenSuspendModal(true);
    //       }}
    //     />
    //   ),
    // },
  ];
  return (
    <>
      <PageHeader title="Users" />
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
                className="bg-[#f1f0f0] p-2 pl-8 outline-none rounded-md w-full"
                placeholder="Search users"
                value={queryName}
                onChange={handleChange}
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
          <div className="overflow-x-scroll hide-scrollbar w-full">
            <div className="min-w-[800px] hide-scrollbar">
              <Table
                columns={columns}
                dataSource={filteredUsers?.map((customer) => ({
                  ...customer,
                  key: customer.id,
                }))}
              />
            </div>
          </div>
        </Suspense>
      </Card>
    </>
  );
};

export default Users;
