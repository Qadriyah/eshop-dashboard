"use client";
import React, { PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BsArrowLeftSquare } from "react-icons/bs";

type HeaderProps = {
  title: string;
  params?: any;
} & PropsWithChildren;

const PageHeader: React.FC<HeaderProps> = ({ title, params, children }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row gap-3 my-10">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          {((params && Object.keys(params)?.length > 0) ||
            pathname?.split("/")?.length! > 3) && (
            <BsArrowLeftSquare
              size={32}
              className="cursor-pointer text-primary hover:text-primary-700"
              role="button"
              onClick={() => router.back()}
            />
          )}
          <h1 className="text-2xl font-medium">{title}</h1>
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
