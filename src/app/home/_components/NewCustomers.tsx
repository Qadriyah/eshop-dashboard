import React from "react";
import Card from "@/components/Card";
import { generateColor } from "@/utils/helpers";

const NewCustomers = () => {
  return (
    <Card>
      <div className="h-[200px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-5">
            <div className="text-4xl">2.5k</div>
          </div>
          <div className="text-sm opacity-45">New Customers This Month</div>
        </div>
        <div className="text-sm">
          <div className="flex">
            <div className="flex-1 font-bold">Week&apos;s Heroes</div>
          </div>
          <div className="inline-flex">
            {["B", "M", "S", "T", "+5"].map((item, index) => (
              <div
                key={index}
                className={`w-[40px] h-[40px] border border-gray-300 rounded-full flex items-center justify-center text-lg text-white ${
                  index !== 0 ? "-ml-3" : ""
                }`}
                style={{
                  backgroundImage: `url()`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: generateColor(),
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewCustomers;
