import Card from "@/components/Card";
import { Skeleton } from "antd";
import React from "react";

const TopSellingLoader = () => {
  return (
    <Card>
      <div className="flex flex-col gap-5">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    </Card>
  );
};

export default TopSellingLoader;
