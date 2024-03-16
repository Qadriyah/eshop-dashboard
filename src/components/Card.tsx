import React, { PropsWithChildren } from "react";

type CardProps = PropsWithChildren;

const Card: React.FC<CardProps> = ({ children }): JSX.Element => {
  return <div className="card-content rounded-lg p-5 bg-white">{children}</div>;
};

export default Card;
