import Card from "@/components/Card";
import { Skeleton } from "antd";
import React from "react";

const ProductOrdersLoader = () => {
  return (
    <Card>
      <div className="flex flex-col gap-5">
        <Skeleton active avatar />
        <Skeleton active avatar />
        <Skeleton active avatar />
      </div>
    </Card>
  );
};

export default ProductOrdersLoader;
