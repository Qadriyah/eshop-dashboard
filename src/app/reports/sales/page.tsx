"use client";

import Card from "@/components/Card";
import Report from "@/components/Report";
import { useSelectorHook } from "@/redux/hooks/hooks";
import { Table, TableProps } from "antd";
import React from "react";
import { NumericFormat } from "react-number-format";

const Sales: React.FC<{}> = (): JSX.Element => {
  const [report, setReport] = React.useState<string>("");
  const sales = useSelectorHook((state) => state.report.sales);
  const [renderSales, setRendersales] = React.useState<any[]>(sales);
  const [dateValue, setDateValue] = React.useState<string[]>([]);

  const searchedData = sales.filter((sale) =>
    sale.date.toLocaleLowerCase().includes(report)
  );
  const searchByDate = sales.filter(
    (sale) => sale.date >= dateValue[0] && sale.date <= dateValue[1]
  );

  const getDateValue = (date: string[]): void => setDateValue(date);

  React.useEffect(() => {
    if (report === "") {
      if (dateValue[0] !== "") {
        setRendersales(searchByDate);
      }
      if (dateValue.length <= 0 || dateValue[0] === "") {
        setRendersales(sales);
      }
    } else {
      setRendersales(searchedData);
    }
  }, [report, dateValue]);

  // antd
  type SalesProps = {
    reportId: string;
    key?: string;
    date: string;
    numberOfOrders: number;
    productsSold: number;
    tax: number;
    total: number;
  };
  const columns: TableProps<SalesProps>["columns"] = [
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
      render: (_, item) => <div className="opacity-70 mb-0">{item.date}</div>,
    },
    {
      key: "no_orders",
      dataIndex: "No. orders",
      title: "no_orders",
      render: (_, item) => (
        <div className="opacity-70 hover:text-[#3875d7]">
          {item.numberOfOrders}
        </div>
      ),
    },
    {
      key: "products_sold",
      dataIndex: "Products sold",
      title: "products_sold",
      render: (_, item) => (
        <div className="opacity-70">{item.productsSold}</div>
      ),
    },
    {
      key: "tax",
      dataIndex: "Tax",
      title: "tax",
      render: (_, item) => (
        <div className="opacity-70">
          <NumericFormat
            value={item.tax}
            prefix={"$"}
            thousandSeparator=","
            displayType="text"
          />
        </div>
      ),
    },
    {
      key: "total",
      dataIndex: "total",
      title: "Total",
      render: (_, item) => (
        <div className="opacity-70">
          <NumericFormat
            value={item.total}
            prefix={"$"}
            thousandSeparator=","
            displayType="text"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
        Sales report
      </h2>
      <Card>
        <Report
          searchName="report"
          searchValue={report}
          placeholder="Search report"
          searchOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setReport(event.target.value)
          }
          showStatus={false}
          handleExport={() => {}}
          getDateValue={getDateValue}
        />
        <div className="overflow-x-scroll hide-scrollbar w-full">
          <div className="min-w-[800px] hide-scrollbar">
            <Table columns={columns} dataSource={renderSales} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Sales;
