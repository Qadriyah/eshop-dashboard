import Card from "@/components/Card";
import { Skeleton } from "antd";
import React from "react";

const DailySalesLoader = () => {
  return (
    <Card>
      <Skeleton active />
    </Card>
  );
};

export default DailySalesLoader;
