"use client";

import React from "react";
import Card from "@/components/Card";
import CustomerDetail from "@/components/CustomerDetail";
import PaymentMethod from "@/components/PaymentMethod";
import ProductCard from "@/components/ProductCard";
import ShouldRender from "@/components/ShouldRender";
import CustomerTransactionsTable from "../CustomerTransactionsTable";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getCustomer,
  getCustomerPaymentMethods,
  getTransactions,
} from "@/api/actions/customer";
import { IoArrowBackSharp } from "react-icons/io5";
import Image from "next/image";
import Suspense from "@/components/Suspense";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";

const cardIcons: Record<string, string> = {
  visa: "/assets/images/visa.svg",
  mastercard: "/assets/images/mastercard.svg",
  americanexpress: "/assets/images/american-express.svg",
};

const CustomerDetails: React.FC<{}> = (): JSX.Element => {
  const params = useParams<{ customerId: string }>();
  const id = params?.customerId;

  const { data } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomer(id),
  });

  const customer = data?.user;
  const customerCard = customer?.profile?.customer;

  const transactions = useQuery({
    queryKey: ["customer-transactions"],
    queryFn: () => getTransactions(id),
  });
  const sales = transactions?.data?.sales;

  type stateProps = {
    mytab: string;
  };

  const [tab, setTab] = React.useState<stateProps>({
    mytab: "overview",
  });

  const onTabChange = (tab: string, value: string) =>
    setTab((prevState) => ({ ...prevState, [tab]: value }));

  const paymentMethods = useQuery({
    queryKey: ["payment-methods", customerCard],
    queryFn: () => getCustomerPaymentMethods(customerCard!),
  });

  console.log(paymentMethods.data?.paymentMethods, ">>>>>");

  return (
    <div>
      <PageHeader title="Customer details" params={params} />
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="min-w-[300px]">
          <Card>
            <div className="w-full">
              <div
                className="w-[100px] h-[100px] mx-auto rounded-full sm:w-[150px] sm:h-[150px]"
                style={{
                  backgroundImage: `url(${
                    customer?.avator || "/assets/images/user.svg"
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />

              <span>
                <h2 className="mt-5 opacity-80 text-lg text-center">
                  {customer?.profile?.fullName}
                </h2>
                <p className="opacity-55 text-center">{customer?.email}</p>
              </span>
              <p className="opacity-90 mt-3 mb-4">Details</p>
              <div className="border-t border-dashed border-[#b6b3b3] pt-3">
                {/* <CustomerDetail label="Account ID" value="ID-3434578" /> */}
                <CustomerDetail
                  label="Billing Email"
                  value={customer?.email!}
                />
                <CustomerDetail
                  label="Phone number"
                  value={customer?.profile?.phone!}
                />
                <CustomerDetail
                  label="Delivery Address"
                  value={
                    paymentMethods.data?.paymentMethods[0]?.billing_address
                      ?.address?.line1!
                  }
                />
                <CustomerDetail label="Latest Transaction" value="#145674" />
              </div>
            </div>
          </Card>
        </div>
        <div className="flex-1">
          <ul className="flex mb-8">
            <li
              className={`font-semibold opacity-60 text-lg p-2 mr-1 pb-2 sm:p-b-4 hover:text-[dodgerblue] cursor-pointer ${
                tab.mytab === "overview" && "active-links-details"
              }`}
              onClick={() => onTabChange("mytab", "overview")}
            >
              Overview
            </li>
            <li
              className={`font-semibold opacity-60 text-lg p-2 mr-1 pb-2 sm:p-b-4 hover:text-[dodgerblue] cursor-pointer ${
                tab.mytab === "advanced" && "active-links-details"
              }`}
              onClick={() => onTabChange("mytab", "advanced")}
            >
              Advanced Settings
            </li>
          </ul>
          <div className="overflow-x-scroll">
            <ShouldRender visible={tab.mytab === "overview"}>
              <ProductCard title="Transaction history" showStatus={true}>
                <Suspense
                  loading={transactions.isLoading}
                  fallback={
                    <div className="flex justify-center items-center h-44">
                      <Loader color="black" />
                    </div>
                  }
                >
                  <CustomerTransactionsTable sales={sales!} />
                </Suspense>
              </ProductCard>
            </ShouldRender>
          </div>
          <ShouldRender visible={tab.mytab === "advanced"}>
            <ProductCard title="Payment Methods" showStatus={true}>
              {paymentMethods?.data?.paymentMethods?.map((method) => (
                <PaymentMethod image={cardIcons[method.brand]} card={method} />
              ))}
            </ProductCard>
          </ShouldRender>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
