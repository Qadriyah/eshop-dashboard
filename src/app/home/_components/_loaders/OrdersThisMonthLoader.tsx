import React from "react";
import { Skeleton } from "antd";
import Card from "@/components/Card";

const OrdersThisMonthLoader = () => {
  return (
    <Card>
      <Skeleton active />
    </Card>
  );
};

export default OrdersThisMonthLoader;
