"use client";

import React, { PropsWithChildren } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {children}
      <div className="hidden md:block bg-[#4081e9] min-h-screen p-10 lg:p-20">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image
            src="/assets/images/dlogo.png"
            width={70}
            height={40}
            alt="logo"
            className="mx-auto"
          />
          <div className="text-white text-center mt-5 text-3xl font-bold">
            Delightful Beauty
          </div>
        </div>
        <Image
          src="/assets/images/auth-screens.png"
          width={450}
          height={450}
          alt=""
          className="mx-auto my-20"
        />
        <p className="text-4xl text-white font-bold mt-8 text-center">
          Fast, Efficient and Reliable
        </p>
      </div>
    </div>
  );
};

export default PageLayout;
