"use client";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import { invoices } from "@/components/Dummy/invoices";
import InvoicePara from "@/components/InvoicePara";
import Card from "@/components/Card";
import { NumericFormat } from "react-number-format";
import Button from "@/components/Button";

const Invoice: React.FC<{}> = (): JSX.Element => {
  const shippingRate = 5;
  const totals = invoices.map((invoice) => invoice.total);
  const subTotal = totals.reduce((total, currentValue) => total + currentValue);
  const navigate = useRouter();

  const handlePrint = (): void => {};
  const handleDownload = (): void => {};

  return (
    <div>
      <div id="myinvoice">
        <Card>
          <div className="flex justify-between sm:mb-16 mb-12 flex-col sm:flex-row">
            <h2 className="text-3xl opacity-85 font-bold uppercase">invoice</h2>
            <div>
              <h2 className="text-[dodgerblue] text-2xl font-bold">Metronic</h2>
              <p className="text-base opacity-70">Kampala, Uganda</p>
            </div>
          </div>
          <div className="pb-5 border-b border-dashed border-[#d3d3d3] mb-5">
            <p className="font-bold opacity-90 text-2xl">
              Dear Mikaela Collins{" "}
              <span className="font-semibold text-sm">(mik@pex.com)</span>,
            </p>
            <p className="text-sm font-semibold opacity-55">
              Here are your order details. We thank you for your purchase
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between mb-5">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-5 flex-wrap">
              <div className="flex flex-col">
                <InvoicePara title="Order ID" value="#14534" />
                <InvoicePara title="Date" value="04 February, 2023" />
              </div>
              <div className="flex flex-col">
                <InvoicePara title="Invoice ID" value="#INV-000414" />
                <InvoicePara title="Shipment ID" value="#SHP-0025410" />
              </div>
            </div>
            <div className="flex flex-col">
              <InvoicePara
                title="Billing Address"
                value="Unit 1/23 Hastings Road, Melbourne 3000, Victoria, Australia."
              />
              <InvoicePara
                title="Shipping Address"
                value="Unit 1/23 Hastings Road, Melbourne 3000, Victoria, Australia."
              />
            </div>
          </div>
          <TableContainer component={Paper} className="hide-scroll-bar">
            <Table sx={{ minWidth: 786 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {["products", "sku", "qty", "total"].map((item) => (
                    <TableCell
                      align={item === "products" ? "left" : "center"}
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
                {invoices.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="min-w-[300px]">
                      <img
                        src={row.image}
                        alt=""
                        className="w-[45px] h-[45px] rounded-md translate-y-3 mr-0"
                      />
                      <div className="mb-0 -translate-y-7 ml-14">
                        <p className="font-bold text-base opacity-90 -mb-1">
                          {row.title}
                        </p>
                        <p className="opacity-60 text-xs">
                          Delivery date:{row.deliverydate}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell align="right" className="min-w-[100px]">
                      <div className="font-bold text-black opacity-60 hover:text-[#3875d7] text-center">
                        {row.sku}
                      </div>
                    </TableCell>
                    <TableCell align="right" className="min-w-[140px]">
                      <div className="text-center">{row.qty}</div>
                    </TableCell>

                    <TableCell align="right" className="min-w-[150px]">
                      <div
                        className={`font-bold opacity-70 text-center p-1 rounded-lg`}
                      >
                        <NumericFormat
                          value={row.total}
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
                    <div className="text-black opacity-60 text-center">
                      Sub total
                    </div>
                  </TableCell>
                  <TableCell align="right" className="min-w-[150px]">
                    <div className="text-black opacity-60 text-center">
                      <NumericFormat
                        thousandSeparator=","
                        value={subTotal}
                        prefix="$"
                        displayType="text"
                      />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}> </TableCell>
                  <TableCell align="right" className="min-w-[150px]">
                    <div className="text-black opacity-60 text-center">
                      VAT(%)
                    </div>
                  </TableCell>
                  <TableCell align="right" className="min-w-[150px]">
                    <div className="text-black opacity-60 text-center">
                      <NumericFormat
                        thousandSeparator=","
                        value="0"
                        prefix="$"
                        displayType="text"
                      />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
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
                  <TableCell colSpan={2}></TableCell>
                  <TableCell align="right" className="min-w-[150px]">
                    <div className="text-black opacity-60 text-center font-semibold">
                      Grand Total
                    </div>
                  </TableCell>
                  <TableCell align="right" className="min-w-[150px]">
                    <div className="text-black text-lg font-bold opacity-100 text-center">
                      <NumericFormat
                        value={subTotal - shippingRate}
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
          <div className="mt-16 flex flex-col sm:flex-row justify-between">
            <div className="flex">
              <Button
                className="text-white p-2 h-10 mr-4 outline-none bg-green-500 rounded-lg opacity-85 hover:opacity-100"
                onClick={handlePrint}
              >
                Print Invoice
              </Button>
              <Button
                className="text-green-500 p-2 h-10 mr-4 outline-none bg-green-100 rounded-lg opacity-80 hover:opacity-100 hover:border hover:border-green-500"
                onClick={handleDownload}
              >
                Download
              </Button>
            </div>
            <Button
              className="text-white max-w-[150px] mt-2 sm:mt-0 p-2 h-10 mr-4 outline-none bg-[dodgerblue] rounded-lg opacity-80 hover:opacity-100"
              onClick={() => navigate.push("/dashboard/invoices/create")}
            >
              Create Invoice
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Invoice;
