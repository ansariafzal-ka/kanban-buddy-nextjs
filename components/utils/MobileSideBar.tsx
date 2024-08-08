"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, SquareKanban } from "lucide-react";
import SideBarNav from "./SideBarNav";
import UserDetail from "./UserDetail";
import axios from "axios";
import { useEffect, useState } from "react";

interface Board {
  _id: string;
  name: string;
}

const MobileSideBar = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchAllBoards = async () => {
      try {
        const response = await axios.get("/api/v1/board");
        setBoards(response.data.boards);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchAllBoards();
  }, []);
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden bg_background"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 bg-[#2c2c38]">
          <VisuallyHidden>
            <SheetTitle>Mobile Sidebar</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </VisuallyHidden>
          <div className="p-6 border border-b-neutral-600 mb-2">
            <div className="flex justify-start gap-1 mb-2">
              <SquareKanban width={24} height={24} />
              <h1 className="text-xl font-medium">Kanban Buddy</h1>
            </div>
            <p className="text-sm text-gray-400 font-light">MY BOARDS (6)</p>
          </div>
          <div className="px-3 pb-2 flex flex-col justify-center items-center gap-3">
            {boards.length > 0 ? (
              boards.map((board) => (
                <SideBarNav key={board._id} id={board._id} title={board.name} />
              ))
            ) : (
              <p>No boards found</p>
            )}
          </div>
          <UserDetail />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSideBar;
