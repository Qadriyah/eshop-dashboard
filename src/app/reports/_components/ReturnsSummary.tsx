import React from "react";
import { Table } from "antd";
import { formatCurrency } from "@/utils/helpers";

type IProps = {
  totalRefund: number;
  totalOrdersReturned: number;
  totalOrdersRefunded: number;
};

const ReturnsSummary: React.FC<IProps> = ({
  totalRefund,
  totalOrdersRefunded,
  totalOrdersReturned,
}) => {
  return (
    <Table.Summary fixed>
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} className="text-[1.063rem] font-bold">
          Totals
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={1}
          align="center"
          className="text-[1.063rem] font-bold"
        >
          {totalOrdersReturned}
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={2}
          align="center"
          className="text-[1.063rem] font-bold"
        >
          {totalOrdersRefunded}
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={3}
          align="right"
          className="text-[1.063rem] font-bold"
        >
          {formatCurrency(totalRefund)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  );
};

export default ReturnsSummary;
