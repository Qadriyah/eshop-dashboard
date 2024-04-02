"use client";

import React from "react";
import Card from "@/components/Card";
import PaymentMethod from "@/components/PaymentMethod";
import ProductCard from "@/components/ProductCard";
import ShouldRender from "@/components/ShouldRender";
import CustomerTransactionsTable from "../_components/CustomerTransactionsTable";
import { useQuery } from "@tanstack/react-query";
import {
  getCustomer,
  getCustomerPaymentMethods,
  getTransactions,
} from "@/api/actions/customer";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { NextPage } from "next";
import CustomerInfo from "../_components/CustomerInfo";
import AddressCard from "../_components/Address";
import TabHeader from "../_components/TabHeader";

type PageProps = {
  params: {
    customerId: string;
  };
};

const CustomerDetails: NextPage<PageProps> = ({ params }): JSX.Element => {
  const [tab, setTab] = React.useState({
    activeTtab: "overview",
  });

  const { data: customer, isLoading: loadingCustomer } = useQuery({
    queryKey: ["customer"],
    queryFn: () => getCustomer(params.customerId),
  });

  const { data: sales, isLoading } = useQuery({
    queryKey: ["customer-transactions"],
    queryFn: () => getTransactions(params.customerId, { limit: 10 }),
  });

  const { data: paymentMethods, isLoading: loadingCards } = useQuery({
    queryKey: ["payment-methods", customer?.user?.profile?.customer],
    queryFn: () =>
      getCustomerPaymentMethods(customer?.user?.profile?.customer!),
    enabled: !!customer?.user?.profile?.customer,
  });

  const onTabChange = (tab: string, value: string) =>
    setTab((prevState) => ({
      ...prevState,
      [tab]: value,
    }));

  return (
    <div>
      <PageHeader title="Customer details" params={params} />
      <Suspense
        fallback={
          <Card>
            <div className="h-56 flex justify-center items-center">
              <Loader color="black" />
            </div>
          </Card>
        }
        loading={isLoading || loadingCards || loadingCustomer}
      >
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="min-w-[300px] flex flex-col gap-5">
            <Card>
              <div className="w-full">
                <div
                  className="w-[120px] h-[120px] mx-auto rounded-full flex justify-center items-center border border-gray-300"
                  style={{
                    backgroundImage: `url(${
                      customer?.user?.avator || "/assets/images/user.svg"
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
                <div>
                  <h2 className="opacity-80 text-lg text-center">
                    {customer?.user?.profile?.fullName}
                  </h2>
                  <p className="opacity-55 text-center">
                    {customer?.user.email}
                  </p>
                </div>
                <CustomerInfo
                  customer={customer?.user!}
                  lastTransaction={sales?.sales?.[0]!}
                />
              </div>
            </Card>
            <Card>
              <AddressCard
                label="Delivery Address"
                address={
                  paymentMethods?.paymentMethods?.[0]?.billing_address
                    ?.address! || null
                }
              />
            </Card>
          </div>
          <div className="flex-1 overflow-x-hidden">
            <TabHeader tab={tab.activeTtab} onTabChange={onTabChange} />
            <div className="overflow-x-scroll">
              <ShouldRender visible={tab.activeTtab === "overview"}>
                <ProductCard title="Transaction history" showStatus={true}>
                  <Suspense
                    loading={isLoading}
                    fallback={
                      <div className="flex justify-center items-center h-44">
                        <Loader color="black" />
                      </div>
                    }
                  >
                    <div className="overflow-x-scroll max-h-[500px]">
                      <CustomerTransactionsTable sales={sales?.sales || []} />
                    </div>
                  </Suspense>
                </ProductCard>
              </ShouldRender>
            </div>
            <ShouldRender visible={tab.activeTtab === "advanced"}>
              <ProductCard title="Payment Methods" showStatus={true}>
                {paymentMethods?.paymentMethods?.length! > 0 ? (
                  paymentMethods?.paymentMethods?.map((method, index) => (
                    <PaymentMethod card={method} key={index} />
                  ))
                ) : (
                  <div className="opacity-45">No payment methods added</div>
                )}
              </ProductCard>
            </ShouldRender>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default CustomerDetails;
