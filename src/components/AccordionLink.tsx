import React, { LiHTMLAttributes } from "react";
import { BsCircleFill } from "react-icons/bs";
import QuickLink from "./QuickLink";

type ListProps = LiHTMLAttributes<HTMLLIElement> & {
  label: string;
  route: string;
};

const AccordionLink: React.FC<ListProps> = ({ label, route }): JSX.Element => {
  return (
    <li className="p-0 rounded-md flex mb-0">
      <BsCircleFill size={6} className="mt-[10px] ml-1" />
      <QuickLink label={label} route={route} />
    </li>
  );
};

export default AccordionLink;
