import React from "react";
import Card from "@/components/Card";
import { AddressType } from "@/types/entities";
import { CiEdit } from "react-icons/ci";
import ShouldRender from "@/components/ShouldRender";

type IProps = {
  label: string;
  address: AddressType;
};

const AddressCard: React.FC<IProps> = ({ label, address }) => {
  return (
    <div>
      <div className="text-2xl flex-1 mb-5">{label}</div>
      <ShouldRender visible={address !== null}>
        <div>
          <div>{`${address?.line1}, ${address?.line2 || ""}`}</div>
          <div>{`${address?.city}, ${address?.state} ${address?.postal_code}`}</div>
          <div>{address?.country}</div>
        </div>
      </ShouldRender>
    </div>
  );
};

export default AddressCard;
