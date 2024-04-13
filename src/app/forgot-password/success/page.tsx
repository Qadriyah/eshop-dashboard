"use client";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import ShouldRender from "@/components/ShouldRender";
import PasswordReset from "../_components/PasswordReset";
import SendInstructions from "../_components/SendInstructions";

const Success = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  return (
    <div className="flex flex-col justify-center items-center h-screen max-w-[700px] mx-auto">
      <div className="my-10">
        <FaCircleCheck size={50} className="text-green-500" />
      </div>
      <ShouldRender visible={source === "passwordreset"}>
        <PasswordReset />
      </ShouldRender>
      <ShouldRender visible={source === "instructions"}>
        <SendInstructions />
      </ShouldRender>
    </div>
  );
};

export default Success;
