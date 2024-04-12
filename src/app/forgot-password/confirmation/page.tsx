"use client";

import Card from "@/components/Card";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const Confirmation = () => {
  const navigate = useRouter();

  return (
    <div className="mt-10 w-3/4 mx-auto lg:w-1/2 max-w-[700px]">
      <Card>
        <div className="p-10">
          <div className="cursor-pointer">
            <Image
              src="/assets/images/dlogo.png"
              width={70}
              height={40}
              alt="logo"
              className="mx-auto"
            />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl text-center font-bold opacity-90 mt-1 sm:mb-3 mb-5">
          Password changed
        </h2>
        <div className="flex justify-center">
          <Button
            className="text-white w-[100px] mb-10 bg-[#4081e9] sm:mt-5 rounded-lg p-[10px]"
            onClick={() => navigate.push("/")}
          >
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Confirmation;
