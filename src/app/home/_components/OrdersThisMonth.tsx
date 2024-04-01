import React from "react";
import { FaArrowDown } from "react-icons/fa6";
import { Progress } from "antd";
import Card from "@/components/Card";
import { SaleType } from "@/types/entities";
import { calPercentageIncrease, calProgress } from "./helpers";
import { FaArrowUp } from "react-icons/fa";

type IProps = {
  currentSales: SaleType[];
  prevSales: SaleType[];
};

const OrdersThisMonth: React.FC<IProps> = ({ currentSales, prevSales }) => {
  const goal = prevSales.length - currentSales.length;
  const percentage = calPercentageIncrease(currentSales, prevSales);
  const progress = calProgress(currentSales, prevSales);

  return (
    <Card>
      <div className="h-[200px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-5">
            <div className="text-4xl">{currentSales?.length}</div>
            <div
              className={`flex items-center text-sm px-1 rounded-md ${
                percentage.increase
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600"
              }`}
            >
              {percentage.increase ? <FaArrowUp /> : <FaArrowDown />}
              <span>{`${percentage.value}%`}</span>
            </div>
          </div>
          <div className="text-sm opacity-45">Orders This Month</div>
        </div>
        <div className="text-sm">
          <div className="flex">
            <div className="flex-1 font-bold">
              {`${goal < 0 ? 0 : goal} to Goal`}
            </div>
            <div className="opacity-45">{`${progress}%`}</div>
          </div>
          <Progress percent={progress} showInfo={false} />
        </div>
      </div>
    </Card>
  );
};

export default OrdersThisMonth;
