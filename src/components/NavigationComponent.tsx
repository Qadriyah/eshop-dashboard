import React, { HTMLAttributes } from "react";
import AccordionComponent from "./Accordion";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import AccordionLink from "./AccordionLink";
import { FcSalesPerformance } from "react-icons/fc";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { VscReport } from "react-icons/vsc";
import { MdOutlineClose } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";

type NavProps = HTMLAttributes<HTMLElement> & {
  onClose?: () => void;
  classname: string;
};

const NavigationComponent: React.FC<NavProps> = ({
  onClose,
  classname,
}): JSX.Element => {
  return (
    <div
      className="flex flex-col h-screen bg-[#152238] w-full m-0"
      id="sidenav"
    >
      <div className="text-slate-300 m-0 h-[90vh] overflow-y-scroll hide-scroll-bar">
        <div className="pt-8 pb-8 pl-8 border-b-[#535151] border-dashed border-b flex justify-between mb-5">
          <img src="/assets/images/custom-1.png" alt="" className={classname} />
          <MdOutlineClose
            size={25}
            className="cursor-pointer mr-2 text-white opacity-50"
            onClick={onClose}
          />
        </div>
        <ul>
          <AccordionComponent
            icon={
              <MdOutlineProductionQuantityLimits
                fill="#fff"
                size={17}
                className="mt-[16px] -mr-2 ml-8 opacity-80"
              />
            }
            id="products_accordion"
            title="Catalogue"
            route="/dashboard/products"
          >
            <AccordionLink label="Products" route="/dashboard/products" />
            {/* <AccordionLink label="Add Product" route="/products/add" /> */}
          </AccordionComponent>
          <AccordionComponent
            icon={
              <FcSalesPerformance
                fill="#fff"
                size={20}
                className="mt-[15px] -mr-2 ml-8 opacity-80"
              />
            }
            id="sales"
            title="Sales"
            route="/dashboard/orders"
          >
            <AccordionLink label="Order Listing" route="/dashboard/orders" />
            {/* <AccordionLink label="Order details" route="/orders/details" /> */}
          </AccordionComponent>
          <AccordionComponent
            icon={
              <LiaPeopleCarrySolid
                fill="#fff"
                size={20}
                className="mt-[14px] -mr-2 ml-8 opacity-80"
              />
            }
            id="customers"
            title="Customers"
            route="/dashboard/customers"
          >
            <AccordionLink label="Customer Listing" route="/dashboard/customers" />
            {/* <AccordionLink
              label="Customer Details"
              route="/customers/details/:id"
            /> */}
          </AccordionComponent>
          <AccordionComponent
            icon={
              <VscReport
                fill="#fff"
                size={20}
                className="mt-[15px] -mr-2 ml-8 opacity-80"
              />
            }
            id="reports"
            title="Reports"
            route="/dashboard/reports"
          >
            <AccordionLink label="Sales" route="/dashboard/reports/sales" />
            <AccordionLink label="Returns" route="/dashboard/reports/returns" />
            <AccordionLink
              label="Customer Orders"
              route="/dashboard/reports/customer-orders"
            />
          </AccordionComponent>
          <AccordionComponent
            icon={
              <FaFileInvoice
                fill="#fff"
                size={17}
                className="mt-[16px] -mr-2 ml-8 opacity-80"
              />
            }
            id="invoice"
            title="Invoice Manager"
            route="/dashboard/invoices"
          >
            <AccordionLink label="Invoice List" route="/dashboard/invoices" />
          </AccordionComponent>
        </ul>
      </div>
    </div>
  );
};

export default NavigationComponent;
