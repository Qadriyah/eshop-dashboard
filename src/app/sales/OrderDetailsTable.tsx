import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Space } from "antd";
import { SaleType } from "@/types/entities";
import { formatCurrency } from "@/utils/helpers";

type OrderDetailProps = {
  order: SaleType;
};

const OrderDetailsTable: React.FC<OrderDetailProps> = ({
  order,
}): JSX.Element => {
  const subTotal = order?.lineItems?.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <TableContainer component={Paper} className="hide-scroll-bar">
      <Table
        sx={{ minWidth: 786 }}
        aria-label="simple table"
        className="border-none"
      >
        <TableHead>
          <TableRow>
            {["product", "qty", "unit price", "total"].map((item) => (
              <TableCell
                align={
                  item === "product"
                    ? "left"
                    : item === "unit price" || item === "total"
                    ? "right"
                    : "center"
                }
                key={item}
              >
                <div className="uppercase text-black text-[1.063rem] font-bold">
                  {item}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {order?.lineItems?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className="border-b-[0.5px]">
                <Space direction="horizontal" className="w-full">
                  <div
                    className="w-[45px] h-[45px] rounded-md border border-gray-300"
                    style={{
                      backgroundImage: `url(${
                        row.icon || "/assets/images/image.svg"
                      })`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="text-[1.063rem]">{row.name}</div>
                </Space>
              </TableCell>
              <TableCell align="right" className="border-b-[0.5px]">
                <div className="text-center text-[1.063rem]">
                  {row.quantity}
                </div>
              </TableCell>
              <TableCell align="right" className="border-b-[0.5px]">
                <div className="text-black text-[1.063rem] text-right">
                  {formatCurrency(row.price)}
                </div>
              </TableCell>
              <TableCell align="right" className="border-b-[0.5px]">
                <div className="text-right text-[1.063rem]">
                  {formatCurrency(row.quantity * row.price)}
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="right" colSpan={3} className="border-b-[0.5px]">
              <div className="text-black text-right text-[1.063rem]">
                Sub total
              </div>
            </TableCell>
            <TableCell
              align="right"
              className="text-[1.063rem] border-b-[0.5px]"
            >
              <div className="text-black text-right">
                {formatCurrency(subTotal)}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={3} className="border-b-[0.5px]">
              <div className="text-black text-right text-[1.063rem]">
                VAT(%)
              </div>
            </TableCell>
            <TableCell align="right" className="border-b-[0.5px]">
              <div className="text-black text-right text-[1.063rem]">
                {formatCurrency(order?.tax)}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={3} className="border-b-[0.5px]">
              <div className="text-black text-right text-[1.063rem]">
                Shipping Rate
              </div>
            </TableCell>
            <TableCell align="right" className="border-b-[0.5px]">
              <div className="text-black text-right text-[1.063rem]">
                {formatCurrency(order?.shipping)}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={3} className="border-b-[0.5px]">
              <div className="text-black text-lg text-right text-[1.063rem] font-bold">
                Grand Total
              </div>
            </TableCell>
            <TableCell align="right" className="border-b-[0.5px]">
              <div className="text-black text-lg font-bold text-right text-[1.063rem]">
                {formatCurrency(subTotal + order?.tax + order?.shipping)}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetailsTable;
