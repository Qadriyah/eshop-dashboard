import React from "react";
import { Table } from "antd";
import { formatCurrency } from "@/utils/helpers";

type IProps = {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
};

const CustomerOrdersSummary: React.FC<IProps> = ({
  totalOrders,
  totalProducts,
  totalSales,
}) => {
  return (
    <Table.Summary fixed>
      <Table.Summary.Row>
        <Table.Summary.Cell
          index={0}
          colSpan={4}
          className="text-[1.063rem] font-bold"
        >
          Totals
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={1}
          align="center"
          className="text-[1.063rem] font-bold"
        >
          {totalOrders}
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={2}
          align="center"
          className="text-[1.063rem] font-bold"
        >
          {totalProducts}
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={3}
          align="right"
          className="text-[1.063rem] font-bold"
        >
          {formatCurrency(totalSales)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  );
};

export default CustomerOrdersSummary;
