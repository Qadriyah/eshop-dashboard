import React, { PropsWithChildren } from "react";
import Menu from "@mui/material/Menu";

type DropdownProps = PropsWithChildren & {
  showImage?: boolean;
  title?: string;
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
        <img
          src={image}
          alt=""
          className="w-[40xp] h-[40px] rounded-lg cursor-pointer -mt-2"
          id={id}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
      ) : (
        <h2
          id={id}
          className="text-black font-semibold opacity-70 cursor-pointer hover:text-[#3875d7]"
          aria-controls={open ? "basic-menu" : undefined}
          // aria-haspopup="true"
          // aria-expanded={open ? "true" : undefined}
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
