import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NumericFormat } from "react-number-format";
import { SaleItemType } from "@/types/entities";
import Image from "next/image";

type OrderDetailProps = {
  detailProducts: SaleItemType[];
  shippingRate?: number;
  tax?: number;
  total: number;
};

const OrderDetailsTable: React.FC<OrderDetailProps> = ({
  detailProducts,
  shippingRate = 5,
  tax,
  total,
}): JSX.Element => {
  return (
    <>
      <TableContainer component={Paper} className="hide-scroll-bar">
        <Table sx={{ minWidth: 786 }} aria-label="simple table">
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
                  <div className="uppercase text-black opacity-40 font-bold">
                    {item}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {detailProducts?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="min-w-[300px]">
                  <Image
                    src={row.icon}
                    alt=""
                    width={45}
                    height={45}
                    className="rounded-md translate-y-3 mr-0"
                  />
                  <div className="mb-0 -translate-y-7 ml-14">
                    <p className="font-bold text-base text-[1.063rem] opacity-90 -mb-1 translate-y-1">
                      {row.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell align="right" className="min-w-[140px]">
                  <div className="text-center text-[1.063rem]">
                    {row.quantity}
                  </div>
                </TableCell>
                <TableCell align="right" className="min-w-[150px]">
                  <div className="font-bold text-black opacity-60 text-[1.063rem] text-right">
                    <NumericFormat
                      value={row.price}
                      prefix={"$"}
                      thousandSeparator=","
                      displayType="text"
                    />
                  </div>
                </TableCell>
                <TableCell align="right" className="min-w-[150px]">
                  <div
                    className={`font-bold opacity-70 text-right text-[1.063rem] p-1 rounded-lg`}
                  >
                    <NumericFormat
                      value={row.quantity * row.price}
                      prefix="$"
                      thousandSeparator=","
                      displayType="text"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-right text-[1.063rem]">
                  Sub total
                </div>
              </TableCell>
              <TableCell
                align="right"
                className="min-w-[150px] text-[1.063rem]"
              >
                <div className="text-black opacity-60 text-right">${total}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}> </TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-right text-[1.063rem]">
                  VAT(%)
                </div>
              </TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-right text-[1.063rem]">
                  {tax}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-right text-[1.063rem]">
                  Shipping Rate
                </div>
              </TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-right text-[1.063rem]">
                  <NumericFormat
                    value={shippingRate}
                    prefix="$"
                    thousandSeparator=","
                    displayType="text"
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-right text-[1.063rem] font-semibold">
                  Grand Total
                </div>
              </TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black text-lg font-bold opacity-100 text-right text-[1.063rem]">
                  <NumericFormat
                    value={total - shippingRate - (tax! / 100) * total}
                    prefix="$"
                    thousandSeparator=","
                    displayType="text"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderDetailsTable;
