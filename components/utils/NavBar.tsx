"use client";
import MobileSideBar from "./MobileSideBar";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Label } from "../ui/label";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";

interface Props {
  boardName: string;
}

const NavBar = ({ boardName }: Props) => {
  const [board, setBoard] = useState("");
  const { data: session } = useSession();
  const { toast } = useToast();
  const handleSubmit = async (e: any) => {
    try {
      const res = await axios.post("/api/v1/board", {
        name: board,
        user: session?.user.id,
      });
      console.log(res.data);
      toast({
        title: "New Board Created Successfully.",
        description: `your new board ${board} has been created successfully.`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full px-6 py-3 bg_background border border-b-neutral-700 flex justify-between items-center">
      <div className="flex justify-center items-center gap-3">
        <MobileSideBar />
        <h1 className="font-medium md:lg">{boardName}</h1>
      </div>
      <Dialog>
        <DialogTrigger>
          <div className="btn_create flex justify-center items-center gap-1">
            <Plus width={16} height={16} />
            <p className="text-sm">Create New Board</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
            <VisuallyHidden>
              <DialogDescription>Create a new board.</DialogDescription>
            </VisuallyHidden>
            <div className="pt-4 flex flex-col justify-center items-start w-full gap-4">
              <Label>Board Name</Label>
              <Input
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                required
              />
              <DialogClose>
                <div
                  onClick={handleSubmit}
                  className="btn_create flex justify-center items-center gap-1"
                >
                  <Plus width={16} height={16} />
                  <p className="text-sm">Create New Board</p>
                </div>
              </DialogClose>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default NavBar;
