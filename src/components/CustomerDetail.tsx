import React from "react";

type CustomerProps = {
  label: string;
  value: string;
};

const CustomerDetail: React.FC<CustomerProps> = ({
  label,
  value,
}): JSX.Element => {
  return (
    <>
      <p className="opacity-90 mb-0">{label}</p>
      <p className="mb-4 opacity-60">{value}</p>
    </>
  );
};

export default CustomerDetail;
