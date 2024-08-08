import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

interface Props {
  id: string;
  title: string;
}

const SideBarNav = ({ title, id }: Props) => {
  return (
    <Link
      href={`/dashboard/${id}`}
      className="w-full text-gray-400 flex justify-ceter items-center gap-3 p-2 rounded-lg hover:bg-primary hover:text-white"
    >
      <LayoutDashboard width={20} height={20} />
      <h1 className="text-[14px] text-center font-medium">{title}</h1>
    </Link>
  );
};

export default SideBarNav;
