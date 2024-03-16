"use client";

import React, { LiHTMLAttributes, PropsWithChildren } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import { usePathname } from "next/navigation";

type AccordionProps = LiHTMLAttributes<HTMLLIElement> &
  PropsWithChildren & {
    id: string;
    title: string;
    route: string;
    icon?: any;
  };

const AccordionComponent: React.FC<AccordionProps> = ({
  id,
  title,
  children,
  icon,
  route,
}): JSX.Element => {
  const pathname = usePathname();

  return (
    <li className="flex">
      {icon}
      <Accordion
        className="text-gray-300 w-full hover:text-white"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "white",
          fontSize: 15,
          marginBottom: -20,
          "& AccordionStyled": {
            margin: "0px !important",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore fill="white" />}
          aria-controls="panel1a-content"
          id={id}
        >
          <p
            className={` ${
              pathname === route ? "text-white" : " text-gray-300 opacity-80"
            }`}
          >
            {title}
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="list-none">{children}</ul>
        </AccordionDetails>
      </Accordion>
    </li>
  );
};

export default AccordionComponent;
