import React from "react";
import { Table } from "antd";
import { formatCurrency } from "@/utils/helpers";

type IProps = {
  totalSold: number;
  totalAmount: number;
};

const ReportSummary: React.FC<IProps> = ({ totalSold, totalAmount }) => {
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
          {totalSold}
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={2}
          align="right"
          className="text-[1.063rem] font-bold"
        >
          {formatCurrency(totalAmount)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  );
};

export default ReportSummary;
