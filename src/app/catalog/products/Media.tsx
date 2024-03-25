import React from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import ShouldRender from "@/components/ShouldRender";

type IProps = {
  imageSrc: string;
  loading?: boolean;
  onDeleteImage: (
    event: React.MouseEvent<HTMLDivElement> & {
      target: HTMLDivElement | HTMLImageElement;
    }
  ) => void;
};

const Media: React.FC<IProps> = ({ imageSrc, loading, onDeleteImage }) => {
  return (
    <div
      className="h-[100px] w-[100px] border border-gray-400 rounded-md"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        id={imageSrc}
        className="bg-white rounded-full p-1 h-[30px] w-[30px] flex items-center justify-center relative -top-[10px] -right-[80px] cursor-pointer text-red-600 hover:bg-black hover:text-white"
        onClick={onDeleteImage}
      >
        <Image
          id={imageSrc}
          src="/assets/images/close.png"
          width={12}
          height={12}
          alt="close"
        />
      </div>
      <ShouldRender visible={loading!}>
        <div className="relative flex justify-center items-center opacity-50 bg-gray-300 h-full w-full -top-[30px]">
          <Loader color="black" />
        </div>
      </ShouldRender>
    </div>
  );
};

export default Media;
