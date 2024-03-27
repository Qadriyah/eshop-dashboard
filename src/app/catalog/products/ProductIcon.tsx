import React from "react";
import Card from "@/components/Card";
import { CiEdit } from "react-icons/ci";
import ShouldRender from "@/components/ShouldRender";
import Loader from "@/components/Loader";

type IProps = {
  icon?: string;
  loading?: boolean;
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProductIcon: React.FC<IProps> = ({ icon, loading, handleFileChange }) => {
  return (
    <Card>
      <h2 className="text-[1.275rem] mb-4 opacity-90 text-[#152238]">
        Thumbnail
      </h2>
      <div className="label-shadow w-[150px] h-[150px] rounded-lg p-5 mb-5 mx-auto my-auto">
        <div
          style={{
            backgroundImage: `url(${icon || "/assets/images/image.svg"})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: 110,
            height: 110,
          }}
        />
        {handleFileChange && (
          <label htmlFor="thumbnail">
            <div className="border border-gray-200 p-1 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-400 hover:text-white flex justify-center items-center h-10 w-10 relative -top-[145px] -right-[105px]">
              <CiEdit />
            </div>
            <input
              type="file"
              id="thumbnail"
              name="thumbnails"
              className="hidden"
              onChange={handleFileChange}
              accept=".png, .jpg, .webp, .jpeg"
            />
          </label>
        )}
        <ShouldRender visible={loading!}>
          <div className="relative -top-[150px] flex justify-center items-center h-[110px] opacity-50 bg-gray-300">
            <Loader color="black" />
          </div>
        </ShouldRender>
      </div>
    </Card>
  );
};

export default ProductIcon;
