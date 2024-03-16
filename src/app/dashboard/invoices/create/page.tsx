"use client";

import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Card from "@/components/Card";
import InvoiceForm from "@/components/InvoiceForm";
import Button from "@/components/Button";

const CreateInvoice: React.FC<{}> = (): JSX.Element => {
  type Form = {
    date: string;
    dueDate: string;
    fromName: string;
    fromEmail: string;
    fromText: string;
    toName: string;
    toEmail: string;
    toText: string;
    notes: string;
    currency: string | number;
  };

  type Item = {
    name: string;
    description: string;
    qty: number;
    price: number;
  };

  const [form, setForm] = React.useState<Form>({
    date: "",
    dueDate: "",
    fromName: "",
    fromEmail: "",
    fromText: "",
    toName: "",
    toEmail: "",
    toText: "",
    notes: "",
    currency: "",
  });

  const [item, setItem] = React.useState<Item>({
    name: "",
    description: "",
    qty: 1,
    price: 0.0,
  });
  const [items, setItems] = React.useState([item]);

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setItem((prevState) => ({ ...prevState, [name]: value }));
  };
  const addItemRow = () => setItems((prevState) => [...prevState, item]);
  const removeItemRow = (myIndex: number) =>
    setItems((prevState) =>
      prevState.filter((item, index) => index !== myIndex)
    );

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-5 md:mb-0 md:mr-5">
          <Card>
            <h1 className="font-bold text-2xl opacity-85 mb-5">
              Invoice #737355
            </h1>
            <div className="flex flex-col pb-5 border-dashed border-b border-[#d3d3d3] mb-7">
              <label className="text-sm mb-5">
                Date:{" "}
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="Select date"
                  className="border-0 font-semibold cursor-pointer outline-none opacity-40 bg-white text-base"
                />
              </label>
              <label className="text-sm mb-5">
                Due Date:{" "}
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  placeholder="Select date"
                  className="border-0 font-semibold cursor-pointer outline-none opacity-40 bg-white text-base"
                />
              </label>
            </div>
            <form className="mb-10">
              <InvoiceForm
                label="Bill From"
                textareaPlaceholder="Who is this invoice from?"
                handleChange={handleChange}
                nameName="fromName"
                nameValue={form.fromName}
                emailName="fromEmail"
                emailValue={form.fromEmail}
                textareaName="fromText"
                textareaValue={form.fromText}
              />
              <InvoiceForm
                label="Bill To"
                textareaPlaceholder="Who is this invoice to?"
                handleChange={handleChange}
                nameName="toName"
                nameValue={form.toName}
                emailName="toEmail"
                emailValue={form.toEmail}
                textareaName="toText"
                textareaValue={form.toText}
              />
            </form>
            <TableContainer component={Paper} className="hide-scroll-bar">
              <Table sx={{ minWidth: 786 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {["item", "qty", "price", "total", "action"].map((item) => (
                      <TableCell
                        align={item === "item" ? "left" : "center"}
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
                  {items.map((myItem, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-[250px]">
                        <input
                          type="text"
                          name="name"
                          value={myItem.name}
                          onChange={handleItemChange}
                          placeholder="Item name"
                          className="border font-[400] opacity-80 border-[#f3f3f3] rounded-md mt-3 outline-none p-3 w-full"
                        />
                        <input
                          type="text"
                          name="description"
                          value={myItem.description}
                          onChange={handleItemChange}
                          placeholder="Item description"
                          className="border font-[400] opacity-80 border-[#f3f3f3] rounded-md mt-3 outline-none p-3 w-full"
                        />
                      </TableCell>
                      <TableCell className="w-[100px] pb-[70px]">
                        <input
                          type="number"
                          name="qty"
                          value={myItem.qty}
                          onChange={handleItemChange}
                          placeholder="qty"
                          min={1}
                          className="border font-[400] opacity-80 border-[#f3f3f3] rounded-md mt-3 outline-none p-3 w-full"
                        />
                      </TableCell>
                      <TableCell className="w-[200px] pb-[70px]">
                        <input
                          type="text"
                          name="price"
                          value={myItem.price}
                          onChange={handleItemChange}
                          placeholder="0.00"
                          min={1}
                          className="border font-[400] opacity-80 border-[#f3f3f3] rounded-md mt-3 outline-none p-3 w-full"
                        />
                      </TableCell>
                      <TableCell className="font-semibold pb-[70px] text-sm text-center opacity-80">
                        ${myItem.qty * myItem.price}
                      </TableCell>
                      <TableCell
                        className="font-semibold pb-[70px] text-sm text-center opacity-80 cursor-pointer hover:text-red-600"
                        onClick={() => removeItemRow(index)}
                      >
                        delete
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      className="font-semibold cursor-pointer hover:text-[dodgerblue]"
                      onClick={addItemRow}
                    >
                      Add Item
                    </TableCell>
                    <TableCell className="font-semibold" colSpan={3}>
                      Subtotal
                    </TableCell>
                    <TableCell className="font-semibold opacity-80  text-center">
                      $0.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}></TableCell>
                    <TableCell className="text-xs">Add Tax</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}></TableCell>
                    <TableCell className="text-xs">Add discount</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}></TableCell>
                    <TableCell className="font-semibold opacity-80">
                      Total
                    </TableCell>
                    <TableCell colSpan={2}></TableCell>
                    <TableCell className="font-semibold opacity-80  text-center">
                      $0.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className="mt-5">
              <label
                className="text-sm mb-3 font-semibold opacity-60"
                onClick={() => console.log(items, ">>>>")}
              >
                Notes
                <textarea
                  placeholder="Thanks for your business"
                  className="border font-[400] opacity-80 border-[#f3f3f3] rounded-md mt-3 outline-none p-3 w-full"
                  rows={3}
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                ></textarea>
              </label>
            </div>
          </Card>
        </div>
        <div className="w-full mg:w/2">
          <Card>
            <div className="pb-5 border-b mb-5 border-dashed border-[#d3d3d3]">
              <label className="text-sm mb-3 font-semibold opacity-60 flex flex-col">
                Currency
                <select
                  className="mt-3 p-2 w-full border border-[#d3d3d3] rounded-md outline-none"
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                >
                  <option>USD - USA Dollar</option>
                  <option>GBP - British Pound</option>
                  <option>UGX - Ugandan Shilling</option>
                </select>
              </label>
            </div>
            <div className="pb-5 border-b mb-5 border-dashed border-[#d3d3d3]">
              <div className="mb-3 flex">
                <Button className="p-2 sm:p-3 rounded-md w-1/2 outline-none font-semibold opacity-70 bg-[#e9e8e8] hover:bg-[#d3d3d3] hover:text-[dodgerblue]">
                  Preview
                </Button>
                <div className="m-2"></div>
                <Button className="p-2 sm:p-3 rounded-md w-1/2 outline-none font-semibold opacity-70 bg-[#e9e8e8] hover:bg-[#d3d3d3] hover:text-[dodgerblue]">
                  Download
                </Button>
              </div>
              <Button className="p-2 sm:p-3 rounded-md w-full outline-none font-semibold bg-[dodgerblue] text-white hover:opacity-75">
                Send Invoice
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;
