import React from "react";
import { Skeleton } from "antd";
import Card from "@/components/Card";

const ProductEarningsLoader = () => {
  return (
    <Card>
      <div className="flex flex-col gap-10">
        <Skeleton.Input active />
        <div className="flex gap-5 items-center">
          <Skeleton.Avatar active size={100} />
          <Skeleton active />
        </div>
      </div>
    </Card>
  );
};

export default ProductEarningsLoader;
