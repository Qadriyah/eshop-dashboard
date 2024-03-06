import React, { HTMLAttributes, PropsWithChildren } from "react";
import { IoSearchOutline } from "react-icons/io5";
import ShouldRender from "./ShouldRender";
import SelectComponent from "./SelectComponent";
import { SelectChangeEvent } from "@mui/material";
import Button from "./Button";
import { CiExport } from "react-icons/ci";
import { DatePicker, Space } from "antd";

type ReportProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    showStatus: boolean;
    handleChange?: (event: SelectChangeEvent) => void;
    value?: string;
    handleExport: () => void;
    searchName: string;
    searchValue: string;
    searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    getDateValue?: (value: string[]) => void;
  };

const Report: React.FC<ReportProps> = ({
  showStatus = true,
  value,
  handleChange,
  children,
  handleExport,
  searchName,
  searchValue,
  searchOnChange,
  placeholder,
  getDateValue,
}): JSX.Element => {
  const { RangePicker } = DatePicker;

  return (
    <div className="flex flex-col xl:flex-row xl:justify-between mb-5 ">
      <div className="lg:mb-3 -mt-5">
        <span>
          <IoSearchOutline
            size={20}
            fill="gray"
            className="translate-y-[35px] opacity-60 translate-x-2"
          />
          <input
            type="text"
            name={searchName}
            value={searchValue}
            placeholder={placeholder}
            onChange={searchOnChange}
            className="bg-[#f1f0f0] mr-3 mt-1 p-2 pl-8 outline-none rounded-md w-full min-w-[200px]"
          />
        </span>
      </div>
      <div className="flex flex-col lg:flex-row justify-between lg:-mt-1 mt-2">
        <RangePicker
          onChange={(_: any, info: any) => getDateValue?.(info)}
          className="w-full p-2 lg:h-10 lg:mt-2 mr-5"
        />

        <div className="flex flex-col lg:flex-row justify-end lg:mt-2 items-end lg:justify-start lg:items-start">
          <div className="xl:ml-2 mt-2 xl:mt-0 sm:w-[150px] lg:mr-2 lg:mt-0">
            <ShouldRender visible={showStatus}>
              <SelectComponent
                handleChange={handleChange}
                label="Status"
                value={value}
                defaultValue=""
              >
                {children}
              </SelectComponent>
            </ShouldRender>
          </div>
          <Button
            className="w-[150px] h-[40px] xl:ml-2 mt-2 lg:mt-0 xl:mt-0 font-semibold rounded-md pb-1 text-[dodgerblue] bg-[#e3f2f7]"
            onClick={handleExport}
          >
            <CiExport className="mr-1 text-[dodgerblue] font-bold mt-1" />{" "}
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Report;
