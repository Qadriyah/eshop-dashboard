import React from "react";
import { Skeleton } from "antd";
import Card from "@/components/Card";

const NewCustomersLoader = () => {
  return (
    <Card>
      <div className="flex flex-col gap-10">
        <Skeleton active />
        <div className="flex">
          <Skeleton.Avatar active size={50} />
          <Skeleton.Avatar active size={50} />
          <Skeleton.Avatar active size={50} />
        </div>
      </div>
    </Card>
  );
};

export default NewCustomersLoader;
