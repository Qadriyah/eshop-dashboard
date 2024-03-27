import React from "react";
import moment from "moment";

type IProps = {
  title: string;
  startDate?: string;
  endDate?: string;
};

const ReportHeader: React.FC<IProps> = ({ title, startDate, endDate }) => {
  return (
    <div className="hidden print:block">
      <div className="text-2xl font-bold">{title}</div>
      <div className="mb-5">
        {`${moment(startDate).format("DD MMM, YYYY")} - ${moment(
          endDate
        ).format("DD MMM YYYY")}`}
      </div>
    </div>
  );
};

export default ReportHeader;
