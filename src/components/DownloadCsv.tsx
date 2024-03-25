import React from "react";
import CsvDownloader from "react-csv-downloader";
import Button from "./Button";
import { BsDownload } from "react-icons/bs";
import { Datas } from "react-csv-downloader/dist/esm/lib/csv";

type IProps = {
  filename: string;
  columns: any[];
  data: any[];
};

const DownloadCsv: React.FC<IProps> = ({ filename, columns, data }) => {
  return (
    <CsvDownloader
      filename={filename}
      extension=".csv"
      separator=","
      wrapColumnChar=""
      columns={columns}
      datas={data as Datas}
    >
      <Button className="font-semibold rounded-md p-2 text-[dodgerblue] bg-[#e3f2f7]">
        <BsDownload className="mr-1 text-[dodgerblue] font-bold mt-1" /> Export
        Report
      </Button>
    </CsvDownloader>
  );
};

export default DownloadCsv;
