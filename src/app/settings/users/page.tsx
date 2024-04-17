"use client";

import React from "react";
import { Table, TableProps } from "antd";
import moment from "moment";
import { IoSearchOutline } from "react-icons/io5";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteCustomer,
  getUsers,
  suspendCustomer,
} from "@/api/actions/customer";
import Card from "@/components/Card";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import Suspense from "@/components/Suspense";
import { UserType } from "@/types/entities";
import { USER_ROLES } from "@/utils/constants";
import DropMenu from "../_components/DropMenu";
import ShouldRender from "@/components/ShouldRender";
import ConfirmationModal from "@/modals/ConfirmationModal";
import { notify } from "@/utils/helpers";

const Users: React.FC = (): JSX.Element => {
  const [users, setUsers] = React.useState<UserType[]>([]);
  const [queryName, setQueryName] = React.useState<string>("");
  const [filteredUsers, setFilteredUsers] = React.useState<UserType[]>([]);
  const [user, setUser] = React.useState<UserType | null>();
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSuspendModal, setOpenSuspendModal] =
    React.useState<boolean>(false);
  const [openUnsuspendModal, setOpenUnsuspendModal] =
    React.useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ user: USER_ROLES.ADMIN }),
  });

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

  const suspendUserMutation = useMutation({
    mutationKey: ["suspend-user"],
    mutationFn: (data: { suspended: boolean }) =>
      suspendCustomer(user?.id!, data),
  });

  const handleUserSuspension = async () => {
    const { errors } = await suspendUserMutation.mutateAsync({
      suspended: true,
    });
    if (errors) {
      notify(errors[0].message, "error");
      return;
    }
    notify("Admin successfully suspended", "success");
    refetch();
    setOpenSuspendModal(false);
  };
  const handleUserUnsuspension = async () => {
    const { errors } = await suspendUserMutation.mutateAsync({
      suspended: false,
    });
    if (errors) {
      notify(errors[0].message, "error");
    }
    notify("Admin successfully unsuspended", "success");
    refetch();
    setOpenUnsuspendModal(false);
  };

  const deleteUserMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: () => deleteCustomer(user?.id!),
  });

  const handleUserDelete = async () => {
    const { errors } = await deleteUserMutation.mutateAsync();
    if (errors) {
      notify(errors[0].message, "error");
    }
    notify("Admin successfully deleted", "success");
    refetch();
    setOpenDeleteModal(false);
  };

  const columns: TableProps<UserType>["columns"] = [
    {
      key: "customer_name",
      title: "Customer name",
      dataIndex: "customer_name",
      render: (_, item) => (
        <div className="text-[1.063rem] opacity-90 mb-0 cursor-pointer hover:text-blue-400">
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
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (_, item) => (
        <DropMenu
          user={item}
          handleOpenDeleteModal={(user: UserType) => {
            setUser(user);
            setOpenDeleteModal(true);
          }}
          handleOpenSuspendModal={(user: UserType) => {
            setUser(user);
            setOpenSuspendModal(true);
          }}
          handleOpenUnsuspendModal={(user: UserType) => {
            setUser(user);
            setOpenUnsuspendModal(true);
          }}
        />
      ),
    },
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
      <ShouldRender visible={openDeleteModal}>
        <ConfirmationModal
          title="Delete User"
          open={openDeleteModal}
          message="Are you sure you want to delete this customer?"
          loading={deleteUserMutation.isPending}
          handleOk={handleUserDelete}
          handleClose={() => {
            setOpenDeleteModal(false);
            setUser(null);
          }}
        />
      </ShouldRender>
      <ShouldRender visible={openSuspendModal}>
        <ConfirmationModal
          title="Suspend User"
          open={openSuspendModal}
          message="Are you sure you want to suspend this customer?"
          loading={suspendUserMutation.isPending}
          handleOk={handleUserSuspension}
          handleClose={() => {
            setOpenSuspendModal(false);
            setUser(null);
          }}
        />
      </ShouldRender>
      <ShouldRender visible={openUnsuspendModal}>
        <ConfirmationModal
          title="Restore User"
          open={openUnsuspendModal}
          message="Are you sure you want to restore this customer?"
          loading={suspendUserMutation.isPending}
          handleOk={handleUserUnsuspension}
          handleClose={() => {
            setOpenUnsuspendModal(false);
            setUser(null);
          }}
        />
      </ShouldRender>
    </>
  );
};

export default Users;
