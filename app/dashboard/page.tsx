import SideBar from "@/components/utils/SideBar";
import NavBar from "@/components/utils/NavBar";

const DashboardLayout = () => {
  return (
    <main className="w-full h-screen flex bg_main">
      <SideBar />
      <div className="flex flex-col w-full h-screen">
        <NavBar boardName="" />
        <div className="p-6 flex justify-center items-center">
          <p className="text-gray-600 italic">
            create a new board / select a board
          </p>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
