import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NumericFormat } from "react-number-format";

type OrderDetailProps = { detailProducts: any[] };

const OrderDetailsTable: React.FC<OrderDetailProps> = ({
  detailProducts,
}): JSX.Element => {
  const shippingRate = 5;
  const totals = detailProducts.map((detail) => detail.qty * detail.unitCost);
  const total = totals.reduce((total, currentValue) => total + currentValue);

  return (
    <>
      <TableContainer component={Paper} className="hide-scroll-bar">
        <Table sx={{ minWidth: 786 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {["product", "sku", "qty", "unit price", "total"].map((item) => (
                <TableCell
                  align={item === "product" ? "left" : "center"}
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
            {detailProducts.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="min-w-[300px]">
                  <img
                    src={row.productImage}
                    alt=""
                    className="w-[45px] h-[45px] rounded-md translate-y-3 mr-0"
                  />
                  <div className="mb-0 -translate-y-7 ml-14">
                    <p className="font-bold text-base opacity-90 -mb-1">
                      {row.productName}
                    </p>
                    <p className="opacity-60 text-xs">
                      Delivery date:{row.date}
                    </p>
                  </div>
                </TableCell>
                <TableCell align="right" className="min-w-[100px]">
                  <div className="font-bold text-black opacity-60 hover:text-[#3875d7] text-center">
                    {row.productId}
                  </div>
                </TableCell>
                <TableCell align="right" className="min-w-[140px]">
                  <div className="text-center">{row.qty}</div>
                </TableCell>
                <TableCell align="right" className="min-w-[150px]">
                  <div className="font-bold text-black opacity-60 text-center">
                    <NumericFormat
                      value={row.unitCost}
                      prefix={"$"}
                      thousandSeparator=","
                      displayType="text"
                    />
                  </div>
                </TableCell>
                <TableCell align="right" className="min-w-[150px]">
                  <div
                    className={`font-bold opacity-70 text-center p-1 rounded-lg`}
                  >
                    <NumericFormat
                      value={row.qty * row.unitCost}
                      prefix="$"
                      thousandSeparator=","
                      displayType="text"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-center">
                  Sub total
                </div>
              </TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-center">
                  ${total}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}> </TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-center">VAT(%)</div>
              </TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-center">0</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-center">
                  Shipping Rate
                </div>
              </TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-center">
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
              <TableCell colSpan={3}></TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black opacity-60 text-center font-semibold">
                  Grand Total
                </div>
              </TableCell>
              <TableCell align="right" className="min-w-[150px]">
                <div className="text-black text-lg font-bold opacity-100 text-center">
                  <NumericFormat
                    value={total - shippingRate}
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
