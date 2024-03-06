"use client";

import React from "react";
import { SlCalender } from "react-icons/sl";
import {
  MdOutlinePayment,
  MdEmail,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import {
  LiaShippingFastSolid,
  LiaFileInvoiceDollarSolid,
} from "react-icons/lia";
import { GiWantedReward } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useParams } from "next/navigation";
import { useSelectorHook } from "@/redux/hooks/hooks";
import ProductCard from "@/components/ProductCard";
import OrderDetail from "@/components/OrderDetail";
import Address from "@/components/Address";
import OrderDetailsTable from "@/pages/orders/OrderDetailsTable";

const OrderDetails: React.FC<{}> = (): JSX.Element => {
  const params = useParams<{ orderId: string }>();
  const orders: any[] = useSelectorHook((state) => state.orders);

  const id = params?.orderId;
  const order = orders.find((order) => order.orderId === id);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
        Order Details
      </h2>
      <div>
        <div className="xl:flex">
          <div className="w-full xl:w-1/3">
            <ProductCard title="Order Details (#14534)">
              <ul>
                <OrderDetail
                  icon={<SlCalender className="mt-1 mr-2" />}
                  label="Date Added"
                  value={order.dateAdded}
                />
                <OrderDetail
                  icon={<MdOutlinePayment className="mt-1 mr-2" />}
                  label="Payment method"
                  value="Online"
                  showImage={true}
                  imageClass="mr-2 w-[50px] h-[15px] mt-[5px]"
                  image={`${window.location.origin}/assets/images/Visa_Brandmark_Blue_RGB.webp`}
                />
                <OrderDetail
                  icon={<LiaShippingFastSolid className="mt-1 mr-2" />}
                  label="Shipping Method"
                  value="Flat Shipping Rate"
                />
              </ul>
            </ProductCard>
          </div>
          <div className="xl:mr-5 xl:ml-5 mt-5 mb-5 w-full xl:w-1/3 xl:mt-0 xl:mb-0">
            <ProductCard title="Customer Details">
              <ul>
                <OrderDetail
                  icon={<SlCalender className="mt-1 mr-2" />}
                  label="Customer"
                  value={order?.customer.customerName as string}
                  showImage={true}
                  imageClass="w-[30px] h-[30px] rounded-full mr-2"
                  image={order?.customer.customerImage}
                  onClick={() => null} // we shall use this to route to the profile div of the customer.
                />
                <OrderDetail
                  icon={<MdEmail className="mt-1 mr-2" />}
                  label="Email"
                  value={order?.customer.customerEmail}
                />
                <OrderDetail
                  icon={<MdOutlinePhoneAndroid className="mt-1 mr-2" />}
                  label="Phone"
                  value={order?.customer.customerContact}
                />
              </ul>
            </ProductCard>
          </div>
          <div className="w-full xl:w-1/3">
            <ProductCard title="Order Details (#14534)">
              <ul>
                <OrderDetail
                  icon={<LiaFileInvoiceDollarSolid className="mt-1 mr-2" />}
                  label="Invoice"
                  value={order.invoice}
                  onClick={() => null} // we shall use this for routing to the invoice.
                />
                <OrderDetail
                  icon={<LiaShippingFastSolid className="mt-1 mr-2" />}
                  label="Shipping"
                  value="	#SHP-0025410"
                />
                <OrderDetail
                  icon={<GiWantedReward className="mt-1 mr-2" />}
                  label="Reward Points"
                  value=""
                />
              </ul>
            </ProductCard>
          </div>
        </div>
        <div className="w-full md:flex md:p-2">
          <Address
            title="Payment Address"
            paragraph={order.paymentAddress}
            icon={
              <HiOutlineShoppingCart className="opacity-5 -mt-3 lg:-mt-12 lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px]" />
            }
            className="w-full md:w-1/2 md:mr-2 md:-ml-2"
          />
          <div className="w-5"></div>
          <Address
            title="Shipping Address"
            paragraph={order.shippingAddress}
            icon={
              <LiaShippingFastSolid className="opacity-5 -mt-3 lg:-mt-12 lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px]" />
            }
            className="w-full md:w-1/2 md:ml-1 md:-mr-2"
          />
        </div>
        <ProductCard title="Order #14534">
          <OrderDetailsTable detailProducts={order.products} />
        </ProductCard>
      </div>
    </div>
  );
};

export default OrderDetails;
