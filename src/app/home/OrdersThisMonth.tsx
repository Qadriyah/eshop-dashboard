import React from "react";
import { FaArrowDown } from "react-icons/fa6";
import { Progress } from "antd";
import Card from "@/components/Card";

const OrdersThisMonth = () => {
  return (
    <Card>
      <div className="h-[200px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-5">
            <div className="text-4xl">1,850</div>
            <div className="flex items-center text-sm px-1 bg-red-200 text-red-600 rounded-md">
              <FaArrowDown />
              <span>2.2%</span>
            </div>
          </div>
          <div className="text-sm opacity-45">Orders This Month</div>
        </div>
        <div className="text-sm">
          <div className="flex">
            <div className="flex-1 font-bold">500 to Goal</div>
            <div className="opacity-45">70%</div>
          </div>
          <Progress percent={70} showInfo={false} />
        </div>
      </div>
    </Card>
  );
};

export default OrdersThisMonth;
