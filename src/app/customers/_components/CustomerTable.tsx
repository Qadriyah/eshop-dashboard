import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useRouter } from "next/navigation";
import moment from "moment";
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
import DropMenu from "./Dropdown";

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
    notify("User has been suspended successfully.", "success");
    refetch();
    setOpenSuspendModal(false);
  };

  const columns: TableProps<UserType>["columns"] = [
    {
      key: "customer_name",
      title: "Customer name",
      dataIndex: "customer_name",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div
          className="cursor-pointer hover:text-blue-400"
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
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div className="text-black hover:text-[#3875d7]">{item.email}</div>
      ),
    },
    {
      key: "roles",
      title: "Roles",
      dataIndex: "roles",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div className="flex gap-2">
          {item?.roles?.map((role) => (
            <div
              key={role}
              className={`px-2 bg-blue-200 border text-blue-600 border-blue-600 text-center rounded-md`}
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
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div
          className={`px-2 text-center rounded-md ${
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
      title: "Date created",
      dataIndex: "created_date",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <div>{moment(item.profile.createdAt).format("MM/DD/YYYY")}</div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      className: "text-[1.063rem]",
      render: (_, item) => (
        <DropMenu
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
            dataSource={customers?.map((customer) => ({
              ...customer,
              key: customer.id,
            }))}
          />
        </div>
        <ShouldRender visible={openDeleteModal}>
          <ConfirmationModal
            title="Delete Customer"
            open={openDeleteModal}
            message="Are you sure you want to delete this customer?"
            loading={deleteUserMutation.isPending}
            handleOk={handleDelete}
            handleClose={() => {
              setCustomer(null);
              setOpenDeleteModal(false);
            }}
          />
        </ShouldRender>
        <ShouldRender visible={openSuspendModal}>
          <ConfirmationModal
            title="Suspend Customer"
            open={openSuspendModal}
            message="Are you sure you want to suspend this customer?"
            loading={suspendUserMutation.isPending}
            handleOk={handleSuspend}
            handleClose={() => {
              setCustomer(null);
              setOpenSuspendModal(false);
            }}
          />
        </ShouldRender>
      </div>
    </>
  );
};

export default CustomerTable;
