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
import ProductCard from "@/components/ProductCard";
import OrderDetail from "@/app/sales/OrderDetail";
import Address from "@/components/Address";
import OrderDetailsTable from "@/app/sales/OrderDetailsTable";
import { useQuery } from "@tanstack/react-query";
import { getSale } from "@/api/actions/sales";
import PageHeader from "@/components/PageHeader";

const OrderDetails: React.FC<{}> = (): JSX.Element => {
  const params = useParams<{ orderId: string }>();
  const id = params?.orderId;

  const { data } = useQuery({
    queryKey: ["sales", id],
    queryFn: () => getSale(id as string),
  });
  const sale = data?.sale;

  return (
    <div>
      <PageHeader title="Order Details"></PageHeader>
      <div>
        <div className="xl:flex">
          <div className="w-full xl:w-1/3">
            <ProductCard title="Order Details (#14534)" showStatus={true}>
              <ul>
                <OrderDetail
                  icon={<SlCalender className="mt-1 mr-2" />}
                  label="Date Added"
                  value={sale?.createdAt.split("T")[0] as string}
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
            <ProductCard title="Customer Details" showStatus={true}>
              <ul>
                <OrderDetail
                  icon={<SlCalender className="mt-1 mr-2" />}
                  label="Customer"
                  value={sale?.customer?.name!}
                  showImage={true}
                  imageClass="w-[30px] h-[30px] rounded-full mr-2"
                  image={"order?.customer.customerImage"}
                  onClick={() => null} // we shall use this to route to the profile div of the customer.
                />
                <OrderDetail
                  icon={<MdEmail className="mt-1 mr-2" />}
                  label="Email"
                  value={sale?.customer?.email!}
                />
                <OrderDetail
                  icon={<MdOutlinePhoneAndroid className="mt-1 mr-2" />}
                  label="Phone"
                  value={sale?.customer?.phone!}
                />
              </ul>
            </ProductCard>
          </div>
          <div className="w-full xl:w-1/3">
            <ProductCard title="Order Details (#14534)" showStatus={true}>
              <ul>
                <OrderDetail
                  icon={<LiaFileInvoiceDollarSolid className="mt-1 mr-2" />}
                  label="Invoice"
                  value={"order.invoice"}
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
            paragraph={sale?.billingAddress?.line1!}
            icon={
              <HiOutlineShoppingCart className="opacity-5 -mt-3 lg:-mt-12 lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px]" />
            }
            className="w-full md:w-1/2 md:mr-2 md:-ml-2"
          />
          <div className="w-5"></div>
          <Address
            title="Shipping Address"
            paragraph={sale?.shippingAddress?.line1!}
            icon={
              <LiaShippingFastSolid className="opacity-5 -mt-3 lg:-mt-12 lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px]" />
            }
            className="w-full md:w-1/2 md:ml-1 md:-mr-2"
          />
        </div>
        <ProductCard title="Order #14534" showStatus={true}>
          <OrderDetailsTable
            detailProducts={sale?.lineItems!}
            tax={sale?.tax}
            shippingRate={sale?.shipping!}
            total={sale?.totalAmount!}
          />
        </ProductCard>
      </div>
    </div>
  );
};

export default OrderDetails;
