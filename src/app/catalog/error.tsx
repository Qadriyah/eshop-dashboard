"use client";

import Card from "@/components/Card";
import Link from "next/link";
import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";

type ErrorTypes = {
  error: Error;
  reset?: () => void;
};

const Error: React.FC<ErrorTypes> = () => {
  return (
    <Card>
      <div className="flex items-center gap-3 text-red-500">
        <BsInfoCircleFill />
        <div>Something went wrong!</div>
      </div>
      <Link
        className="flex items-center justify-center gap-2 hover:text-blue-600 my-20 cursor-pointer"
        href="/"
      >
        <FaArrowLeft />
        <div>Back to home</div>
      </Link>
    </Card>
  );
};

export default Error;
