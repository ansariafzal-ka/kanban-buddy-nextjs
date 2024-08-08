import React, { ReactNode } from "react";

interface Props {
  title: string;

  children: ReactNode;
}

const CardContainer = ({ title, children }: Props) => {
  return (
    <div>
      <h1 className="mb-3 font-light text-gray-300">{title}</h1>
      <div className="flex flex-col justify-center items-start gap-4">
        {children}
      </div>
    </div>
  );
};

export default CardContainer;
