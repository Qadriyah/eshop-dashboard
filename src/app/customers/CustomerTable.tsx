"use client";

import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useRouter } from "next/navigation";
import moment from "moment";
import DropdownCustomer from "./Dropdown";
import ShouldRender from "@/components/ShouldRender";
import ConfirmationModal from "@/modals/ConfirmationModal";
import { UserType } from "@/types/entities";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import {
  CustomerTypes,
  deleteCustomer,
  suspendCustomer,
} from "@/api/actions/customer";
import { notify } from "@/utils/helpers";

type CustomerProps = {
  customers: UserType[];
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<CustomerTypes, Error>>;
};

const CustomerTable: React.FC<CustomerProps> = ({
  customers,
  refetch,
}): JSX.Element => {
  const navigate = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSuspendModal, setOpenSuspendModal] =
    React.useState<boolean>(false);
  const [customer, setCustomer] = React.useState<UserType | null>(null);

  const suspendUserMutation = useMutation({
    mutationKey: ["suspend-customer"],
    mutationFn: (data: { suspended: boolean }) =>
      suspendCustomer(customer?.id!, data),
  });

  const deleteUserMutation = useMutation({
    mutationKey: ["detele-customer"],
    mutationFn: () => deleteCustomer(customer?.id!),
  });

  const handleDelete = async () => {
    const { errors } = await deleteUserMutation.mutateAsync();
    if (errors) {
      notify(errors[0].message, "error");
      return;
    }
    notify("User has been successfully deleted", "success");
    refetch();
    setOpenDeleteModal(false);
  };

  const handleSuspend = async () => {
    const { errors } = await suspendUserMutation.mutateAsync({
      suspended: true,
    });
    if (errors) {
      notify(errors[0].message, "error");
      return;
    }
    notify("User has been suspended successfully.", "Success");
    refetch();
    setOpenSuspendModal(false);
  };

  const columns: TableProps<UserType>["columns"] = [
    {
      key: "customer_name",
      title: "Customer name",
      dataIndex: "customer_name",
      render: (_, item) => (
        <div
          className="text-[1.063rem] opacity-90 mb-0 cursor-pointer hover:text-blue-400"
          onClick={() => navigate.push(`/customers/${item.id}`)}
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
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (_, item) => (
        <div
          className={`p-1 opacity-60 text-[1.063rem] font-bold text-center rounded-md ${
            item.deleted
              ? "text-red-600 bg-red-200"
              : item.suspended
              ? "text-blue-600 bg-blue-200"
              : "text-green-600 bg-green-200"
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
        <DropdownCustomer
          customer={item}
          handleOpenDeleteModal={(customer: UserType) => {
            setCustomer(customer);
            setOpenDeleteModal(true);
          }}
          handleOpenSuspendModal={(customer: UserType) => {
            setCustomer(customer);
            setOpenSuspendModal(true);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-scroll hide-scrollbar w-full">
        <div className="min-w-[800px] hide-scrollbar">
          <Table
            columns={columns}
            dataSource={customers.map((customer, index) => ({
              ...customer,
              key: customer.id,
            }))}
          />
        </div>
        <ShouldRender visible={openDeleteModal}>
          <ConfirmationModal
            title="Delete Customer"
            open={openDeleteModal}
            handleClose={() => {
              setCustomer(null);
              setOpenDeleteModal(false);
            }}
            message="Are you sure you want to delete this customer?"
            handleOk={handleDelete}
          />
        </ShouldRender>
        <ShouldRender visible={openSuspendModal}>
          <ConfirmationModal
            title="Suspend Customer"
            open={openSuspendModal}
            handleClose={() => {
              setCustomer(null);
              setOpenSuspendModal(false);
            }}
            message="Are you sure you want to suspend this customer?"
            handleOk={handleSuspend}
            loading={suspendUserMutation.isPending}
          />
        </ShouldRender>
      </div>
    </>
  );
};

export default CustomerTable;
