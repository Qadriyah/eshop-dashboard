"use client";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Card from "@/components/Card";
import SelectComponent from "@/components/SelectComponent";
import OrdersTable from "@/app/sales/OrdersTable";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "@/api/actions/sales";
import { SaleType } from "@/types/entities";
import { SALE_STATUS } from "@/utils/constants";
import ShouldRender from "@/components/ShouldRender";
import UpdateStatusModal from "@/modals/UpdateStatusModal";

const Orders: React.FC<{}> = (): JSX.Element => {
  const [sale, setSale] = React.useState<string>("");
  const [status, setStatus] = React.useState("all");
  const [sales, setSales] = React.useState<SaleType[]>([]);
  const [filteredSales, setFilteredSales] = React.useState<SaleType[]>([]);
  const [openStatusModal, setOpenStatusModal] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<SaleType>();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(),
  });

  const handleChange = (event: SelectChangeEvent<any>) => {
    const { value } = event.target;
    setStatus(value);
    if (!value || value === "all") {
      setFilteredSales(sales);
    } else {
      setFilteredSales(() => sales.filter((sale) => sale.status === value));
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSale(value);
    if (!value) {
      setFilteredSales(sales);
    } else {
      setFilteredSales(() =>
        sales.filter((sale) =>
          sale?.customer?.name
            ?.toLocaleLowerCase()
            ?.includes(value.toLocaleLowerCase())
        )
      );
    }
  };

  const onUpdateStatus = (order: SaleType) => {
    setSelectedOrder(order);
    setOpenStatusModal(true);
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
                  onChange={handleSearch}
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
                  <MenuItem value={SALE_STATUS.cancelled}>Cancelled</MenuItem>
                  <MenuItem value={SALE_STATUS.completed}>Completed</MenuItem>
                  <MenuItem value={SALE_STATUS.processing}>Processing</MenuItem>
                  <MenuItem value={SALE_STATUS.returned}>Returned</MenuItem>
                  <MenuItem value={SALE_STATUS.delivering}>Delivering</MenuItem>
                </SelectComponent>
              </div>
            </div>
            <OrdersTable
              orders={filteredSales}
              isLoading={isLoading}
              onUpdateStatus={onUpdateStatus}
            />
          </div>
        </Card>
      </div>
      <ShouldRender visible={openStatusModal}>
        <UpdateStatusModal
          title="Update status"
          open={openStatusModal}
          order={selectedOrder!}
          refetch={refetch}
          handleClose={(): void => setOpenStatusModal(false)}
        />
      </ShouldRender>
    </div>
  );
};

export default Orders;
