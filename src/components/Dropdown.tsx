import React, { PropsWithChildren } from "react";
import Menu from "@mui/material/Menu";

type DropdownProps = PropsWithChildren & {
  showImage?: boolean;
  title?: string | JSX.Element;
  id: string;
  image?: any;
  anchorEl: any;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLImageElement>) => void;
  handleClose: () => void;
  classname?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  showImage = false,
  children,
  title,
  id,
  image,
  anchorEl,
  open,
  handleClick,
  handleClose,
  classname,
}): JSX.Element => {
  return (
    <div className={classname}>
      {showImage ? (
        <div
          className="h-[40px] w-[40px] rounded-full cursor-pointer border border-gray-300"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          onClick={handleClick}
        />
      ) : (
        <h2
          id={id}
          className="text-black font-semibold opacity-70 cursor-pointer hover:text-[#3875d7]"
          aria-controls={open ? "basic-menu" : undefined}
          onClick={handleClick}
        >
          {title}
        </h2>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {children}
      </Menu>
    </div>
  );
};

export default Dropdown;
