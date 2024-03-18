import PageHeader from "@/components/PageHeader";
import React from "react";

type PageParams = {
  params: {
    productid: string;
  };
};

const EditProduct: React.FC<PageParams> = ({ params }) => {
  return (
    <div>
      <PageHeader title="Edit Product" params={params} />
      <div>EditProduct</div>
    </div>
  );
};

export default EditProduct;
