"use client";

import Card from "@/components/Card";
import Report from "@/components/Report";
import { useSelectorHook } from "@/redux/hooks/hooks";
import { Table, TableProps } from "antd";
import React from "react";
import { NumericFormat } from "react-number-format";

const Returns: React.FC<{}> = (): JSX.Element => {
  const [return_, setReturn] = React.useState<string>("");
  const returns = useSelectorHook((state) => state.report.returns);
  const [renderSales, setRendersales] = React.useState<any[]>(returns);
  const [dateValue, setDateValue] = React.useState<string[]>([]);

  const searchedData = returns.filter((item) =>
    item.date.toLocaleLowerCase().includes(return_)
  );
  const searchByDate = returns.filter(
    (item) => item.date >= dateValue[0] && item.date <= dateValue[1]
  );

  const getDateValue = (date: string[]): void => setDateValue(date);

  React.useEffect(() => {
    if (return_ === "") {
      if (dateValue[0] !== "") {
        setRendersales(searchByDate);
      }
      if (dateValue.length <= 0 || dateValue[0] === "") {
        setRendersales(returns);
      }
    } else {
      setRendersales(searchedData);
    }
  }, [return_, dateValue]);

  // antd
  type ReturnsProps = {
    key: string;
    date: string;
    noOrdersReturned: number;
    noOrdersRefuned: number;
    noOrdersReplaced: number;
    totalRefunded: number;
    totalReplaced: number;
  };
  const columns: TableProps<ReturnsProps>["columns"] = [
    {
      key: "date",
      title: "Date",
      dataIndex: "date",
      render: (_, item) => <div className="opacity-70 mb-0">{item.date}</div>,
    },
    {
      key: "no_orders_returned",
      title: "No. orders returned",
      dataIndex: "no_orders_returned",
      render: (_, item) => (
        <div className="opacity-70 hover:text-[#3875d7] text-center">
          {item.noOrdersReturned}
        </div>
      ),
    },
    {
      key: "no_orders_refunded",
      title: "No. orders refunded",
      dataIndex: "no_orders_refunded",
      render: (_, item) => (
        <div className="opacity-70 hover:text-[#3875d7] text-center">
          {item.noOrdersRefuned}
        </div>
      ),
    },
    {
      key: "no_orders_replaced",
      title: "No. orders replaced",
      dataIndex: "no_orders_replaced",
      render: (_, item) => (
        <div className="text-center">{item.noOrdersReplaced}</div>
      ),
    },
    {
      key: "total_refunded",
      title: "Total refunded",
      dataIndex: "total_refunded",
      render: (_, item) => (
        <div className="opacity-70">
          <NumericFormat
            value={item.totalRefunded}
            prefix={"$"}
            thousandSeparator=","
            displayType="text"
            className="text-center"
          />
        </div>
      ),
    },
    {
      key: "total_replaced",
      title: "Total replaced",
      dataIndex: "total_replaced",
      render: (_, item) => (
        <div className="opacity-70">
          <NumericFormat
            value={item.totalReplaced}
            prefix={"$"}
            thousandSeparator=","
            displayType="text"
            className="text-center"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
        Returns report
      </h2>
      <Card>
        <Report
          searchName="report"
          searchValue={return_}
          placeholder="Search report"
          searchOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setReturn(event.target.value)
          }
          showStatus={false}
          handleExport={() => {}}
          getDateValue={getDateValue}
        />
        <div className="overflow-x-scroll hide-scrollbar w-full">
          <div className="min-w-[900px] hide-scrollbar">
            <Table columns={columns} dataSource={renderSales} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Returns;
