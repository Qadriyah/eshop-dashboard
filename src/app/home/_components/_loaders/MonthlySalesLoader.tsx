import React from "react";
import { Skeleton } from "antd";
import Card from "@/components/Card";

const MonthlySalesLoader = () => {
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

export default MonthlySalesLoader;
