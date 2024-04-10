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
import ProductCard from "@/components/ProductCard";
import OrderDetail from "@/app/sales/_components/OrderDetail";
import Address from "@/components/Address";
import OrderDetailsTable from "@/app/sales/_components/OrderDetailsTable";
import { useQuery } from "@tanstack/react-query";
import { getSale } from "@/api/actions/sales";
import PageHeader from "@/components/PageHeader";
import moment from "moment";
import { FaCircleUser } from "react-icons/fa6";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";

type PageParams = {
  params: {
    orderId: string;
  };
};

const OrderDetails: React.FC<PageParams> = ({ params }): JSX.Element => {
  const { data, isLoading } = useQuery({
    queryKey: ["sales", params.orderId],
    queryFn: () => getSale(params.orderId),
  });

  return (
    <div>
      <PageHeader title="Order Details"></PageHeader>
      <Suspense
        fallback={
          <div className="h-56 flex items-center justify-center">
            <Loader color="black" />
          </div>
        }
        loading={isLoading}
      >
        <div>
          <div className="xl:flex">
            <div className="w-full xl:w-1/3">
              <ProductCard title="Order Details (#14534)" showStatus={true}>
                <div>
                  <OrderDetail
                    icon={<SlCalender className="mt-1 mr-2" />}
                    label="Date Added"
                    value={moment(data?.sale?.createdAt).format("MM/DD/YYYY")}
                  />
                  <OrderDetail
                    icon={<MdOutlinePayment className="mt-1 mr-2" />}
                    label="Payment method"
                    value="Online"
                    image="/assets/images/visa.svg"
                  />
                  <OrderDetail
                    icon={<LiaShippingFastSolid className="mt-1 mr-2" />}
                    label="Shipping Method"
                    value="Flat Shipping Rate"
                  />
                </div>
              </ProductCard>
            </div>
            <div className="xl:mr-5 xl:ml-5 mt-5 mb-5 w-full xl:w-1/3 xl:mt-0 xl:mb-0">
              <ProductCard title="Customer Details" showStatus={true}>
                <div>
                  <OrderDetail
                    icon={<FaCircleUser className="mt-1 mr-2" />}
                    label="Customer"
                    value={data?.sale?.customer?.name!}
                    image={data?.sale?.user?.avator}
                    onClick={() => null}
                  />
                  <OrderDetail
                    icon={<MdEmail className="mt-1 mr-2" />}
                    label="Email"
                    value={data?.sale?.customer?.email!}
                  />
                  <OrderDetail
                    icon={<MdOutlinePhoneAndroid className="mt-1 mr-2" />}
                    label="Phone"
                    value={data?.sale?.user?.profile?.phone || "-"}
                  />
                </div>
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
          <div className="flex flex-col lg:min-[1250px]:flex-row gap-5">
            <div className="flex-1">
              <Address
                title="Payment Address"
                paragraph={data?.sale?.billingAddress?.line1!}
                icon={
                  <HiOutlineShoppingCart className="opacity-5 -mt-3 lg:-mt-12 lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px]" />
                }
                address={data?.sale?.billingAddress!}
              />
            </div>
            <div className="flex-1">
              <Address
                title="Shipping Address"
                paragraph={data?.sale?.shippingAddress?.line1!}
                icon={
                  <LiaShippingFastSolid className="opacity-5 -mt-3 lg:-mt-12 lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px]" />
                }
                address={
                  data?.sale?.shippingAddress || data?.sale?.billingAddress!
                }
              />
            </div>
          </div>
          <ProductCard title="Order #14534" showStatus={true}>
            <OrderDetailsTable order={data?.sale!} />
          </ProductCard>
        </div>
      </Suspense>
    </div>
  );
};

export default OrderDetails;
