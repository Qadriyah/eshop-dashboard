import React from "react";
import Page from "../Page";
import Card from "../../components/Card";
import CustomerDetail from "../../components/CustomerDetail";
import ProductCard from "../../components/ProductCard";
import CustomerTransactionsTable from "./CustomerTransactionsTable";
import PaymentMethod from "../../components/PaymentMethod";
import ShouldRender from "../../components/ShouldRender";

const CustomerDetails: React.FC<{}> = (): JSX.Element => {
  type stateProps = {
    mytab: string;
  };

  const [tab, setTab] = React.useState<stateProps>({
    mytab: "overview",
  });

  const onTabChange = (tab: string, value: string) =>
    setTab((prevState) => ({ ...prevState, [tab]: value }));

  return (
    <Page>
      <h2 className="text-2xl font-bold mb-4 opacity-90 text-[#152238]">
        Customer Details
      </h2>
      <div className="md:flex w-full">
        <div className="w-full mr-5 md:w-1/4 sm:min-w-[250px]">
          <Card>
            <div className="w-full">
              <img
                src={`${window.location.origin}/assets/images/man_image.png`}
                alt=""
                className="w-[100px] h-[100px] mx-auto rounded-full sm:w-[150px] sm:h-[150px]"
              />
              <span>
                <h2 className="font-bold mt-5 opacity-80 text-lg text-center">
                  Max Smith
                </h2>
                <p className="font-semibold opacity-55 text-center">
                  max@email.com
                </p>
              </span>
              <p className="opacity-90 font-bold mt-3 mb-4">Details</p>
              <div className="border-t border-dashed border-[#b6b3b3] pt-3">
                <CustomerDetail label="Account ID" value="ID-3434578" />
                <CustomerDetail
                  label="Billing Email"
                  value="info@company.com"
                />
                <CustomerDetail label="Phone number" value="+256 785679034" />
                <CustomerDetail
                  label="Delivery Address"
                  value="Kawempe, Kampala"
                />
                <CustomerDetail label="Latest Transaction" value="#145674" />
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-7 md:mt-0 w-full flex flex-col flex-wrap">
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
          <div className="md:pr-5 md:w-[55%] lg:w-3/4 xl:w-full">
            <ShouldRender visible={tab.mytab === "overview"}>
              <ProductCard title="Transaction history">
                <CustomerTransactionsTable />
              </ProductCard>
            </ShouldRender>
          </div>
          <ShouldRender visible={tab.mytab === "advanced"}>
            <ProductCard title="Payment Methods">
              <PaymentMethod
                image={`${window.location.origin}/assets/images/Visa_Brandmark_Blue_RGB.webp`}
                paymentName="Visa"
                expiry="Expires Feb 2024"
                customerName="Henry Garner"
                number="****639"
                expireType="Master Card Credit card"
                phoneNumber="no phone provided"
                issureID="VICBANK_id_jsjh89kksa"
                billingAddress="Au"
                email="kante@email.com"
                origin="Australia"
                passed="True"
              />
              <PaymentMethod
                image={`${window.location.origin}/assets/images/Visa_Brandmark_Blue_RGB.webp`}
                paymentName="Visa"
                expiry="Expires Feb 2024"
                customerName="Henry Garner"
                number="****639"
                expireType="Master Card Credit card"
                phoneNumber="no phone provided"
                issureID="VICBANK_id_jsjh89kksa"
                billingAddress="Au"
                email="kante@email.com"
                origin="Australia"
                passed="True"
              />
            </ProductCard>
          </ShouldRender>
        </div>
      </div>
    </Page>
  );
};

export default CustomerDetails;
