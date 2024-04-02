import React from "react";

type IProps = {
  tab: string;
  onTabChange: (name: string, tab: string) => void;
};

const TabHeader: React.FC<IProps> = ({ tab, onTabChange }) => {
  return (
    <ul className="flex mb-8">
      <li
        className={`font-semibold opacity-60 text-lg p-2 mr-1 pb-2 sm:p-b-4 hover:text-[dodgerblue] cursor-pointer ${
          tab === "overview" && "active-links-details"
        }`}
        onClick={() => onTabChange("activeTtab", "overview")}
      >
        Overview
      </li>
      <li
        className={`font-semibold opacity-60 text-lg p-2 mr-1 pb-2 sm:p-b-4 hover:text-[dodgerblue] cursor-pointer ${
          tab === "advanced" && "active-links-details"
        }`}
        onClick={() => onTabChange("activeTtab", "advanced")}
      >
        Advanced Settings
      </li>
    </ul>
  );
};

export default TabHeader;
