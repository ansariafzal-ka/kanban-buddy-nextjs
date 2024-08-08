"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import SideBar from "@/components/utils/SideBar";
import NavBar from "@/components/utils/NavBar";
import Board from "@/components/pages/Board";

interface Board {
  _id: string;
  name: string;
}

const DashboardLayout = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [board, setBoard] = useState<Board | null>(null);
  const { boardId } = useParams();

  useEffect(() => {
    const fetchBoard = async () => {
      if (boardId) {
        try {
          const response = await axios.get(`/api/v1/board/${boardId}`);
          console.log(response.data.board);
          setBoard(response.data.board);
        } catch (error) {
          console.error("Error fetching board:", error);
        }
      }
    };
    // const fetchAllBoards = async () => {
    //   if (boardId) {
    //     try {
    //       const response = await axios.get("/api/v1/board");
    //       console.log(response.data.boards);
    //       setBoards(response.data.boards);
    //     } catch (error) {
    //       console.error("Error fetching board:", error);
    //     }
    //   }
    // };
    // fetchAllBoards();
    fetchBoard();
  }, [boardId]);

  return (
    <main className="w-full h-screen flex bg_main">
      <SideBar />
      <div className="flex flex-col w-full h-screen">
        <NavBar boardName={board?.name || ""} />
        <Board />
      </div>
    </main>
  );
};

export default DashboardLayout;
