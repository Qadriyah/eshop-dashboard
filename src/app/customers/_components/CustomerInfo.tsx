import React from "react";
import CustomerDetail from "@/components/CustomerDetail";
import { SaleType, UserType } from "@/types/entities";

type IProp = {
  customer: UserType;
  lastTransaction: SaleType;
};

const CustomerInfo: React.FC<IProp> = ({ customer, lastTransaction }) => {
  return (
    <div>
      <div className="opacity-90 mt-3 mb-4">Details</div>
      <div className="border-t border-dashed border-[#b6b3b3] pt-3">
        <CustomerDetail label="Billing Email" value={customer?.email} />
        <CustomerDetail
          label="Phone number"
          value={customer?.profile?.phone || "-"}
        />
        <CustomerDetail
          label="Latest Transaction"
          value={`#${lastTransaction?.orderNumber}` || "-"}
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
