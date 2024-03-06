import React from "react";

type InvoiceParaProps = { title: string; value: string };

const InvoicePara: React.FC<InvoiceParaProps> = ({ title, value }) => {
  return (
    <div className="mb-6">
      <p className="font-bold opacity-60 mb-1">{title}</p>
      <p className="font-semibold opacity-95 text-xs">{value}</p>
    </div>
  );
};

export default InvoicePara;
