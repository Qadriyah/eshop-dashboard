import React from "react";

type UserProps = {
  label: string;
  value: string;
  icon?: JSX.Element;
  onEdit?: () => void;
};

const UserDetail: React.FC<UserProps> = ({
  label,
  value,
  icon,
  onEdit,
}): JSX.Element => {
  return (
    <>
      <div className="opacity-90 mb-0 flex">
        <div className="flex-1">{label}</div>
        {onEdit && (
          <div
            className="border border-gray-200 p-1 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-400 hover:text-white flex justify-center items-center"
            onClick={() => onEdit()}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="mb-4 opacity-60">{value}</div>
    </>
  );
};

export default UserDetail;
