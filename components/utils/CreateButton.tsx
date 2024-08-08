import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface Props {
  children: ReactNode;
  onClick?: (e: any) => void;
}

const CreateButton = ({ children, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="min-w-[170px] sm:max-w-[170px] bg-violet-600 hover:bg-violet-700 duration-300 text-sm px-3 py-2 rounded-full flex justify-center items-center gap-1 cursor-pointer"
    >
      <Plus width={18} height={18} />
      {children}
    </div>
  );
};

export default CreateButton;
