"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { AnchorHTMLAttributes } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  route: string;
  label: string;
};

const QuickLink: React.FC<LinkProps> = ({ route, label }): JSX.Element => {
  const pathname = usePathname();

  return (
    <Link
      href={route}
      className={`text-gray-300 m-1 opacity-80 hover:text-white hover:font-bold text-sm ${
        pathname === route && "text-white opacity-100"
      }`}
    >
      {label}
    </Link>
  );
};

export default QuickLink;
