"use client";

import React, { useEffect, useState } from "react";
import SideBarNav from "./SideBarNav";
import { SquareKanban } from "lucide-react";
import UserDetail from "./UserDetail";
import axios from "axios";

interface Board {
  _id: string;
  name: string;
}

const SideBar = () => {
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
    <div className="min-w-[275px] h-screen sticky top-0 left-0 hidden md:block border border-r-neutral-700 bg_background">
      <div className="p-6 border border-b-neutral-600 mb-2">
        <div className="flex justify-start gap-1 mb-2">
          <SquareKanban width={24} height={24} className="text-violet-600" />
          <h1 className="text-xl font-medium">Kanban Buddy</h1>
        </div>
        <p className="text-sm text-gray-400 font-light">
          MY BOARDS ({boards.length})
        </p>
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
    </div>
  );
};

export default SideBar;
