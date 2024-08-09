import CardContainer from "@/components/utils/CardContainer";
import TaskCard from "@/components/utils/TaskCard";
import { Plus, Trash } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  board: string;
}

const Board = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const { boardId } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axios.get("/api/v1/task");
        setTasks(response.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTasks();
  }, []);

  const handleBoardDelete = async () => {
    try {
      const response = await axios.delete(`/api/v1/board/${boardId}`);
      console.log(response.data);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/v1/task", {
        title: title,
        description: description,
        board: boardId,
      });
      setTasks((prevTasks) => [...prevTasks, response.data.newTask]);
      toast({
        title: "New Task Created Successfully.",
        description: `Your new task has been added successfully.`,
      });
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    toast({
      title: "Task Deleted Successfully.",
      description: `Your task has been deleted successfully.`,
    });
  };

  const handleDone = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, status: "DONE" } : task
      )
    );
    toast({
      title: "Task Marked as Done.",
      description: `Your task has been marked as done.`,
    });
  };

  const handleDoing = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, status: "DOING" } : task
      )
    );
    toast({
      title: "Task Marked as Doing.",
      description: `Your task has been marked as doing.`,
    });
  };

  const renderTasks = (status: string) => {
    const filteredTasks = tasks.filter(
      (task) => task.status === status && task.board === boardId
    );

    return filteredTasks.length > 0 ? (
      filteredTasks.map((task) => (
        <TaskCard
          key={task._id}
          id={task._id}
          title={task.title}
          description={task.description}
          onDelete={handleDelete}
          onDone={handleDone}
          onDoing={handleDoing}
        />
      ))
    ) : (
      <p className="text-gray-600 italic">No Tasks Present</p>
    );
  };

  return (
    <section>
      <div className="p-4">
        <Dialog>
          <div className="flex justify-start items-center gap-4">
            <DialogTrigger>
              <div className="btn_create flex justify-center items-center gap-1">
                <Plus width={16} height={16} />
                <p className="text-sm">Add New Task</p>
              </div>
            </DialogTrigger>
            <AlertDialog>
              <AlertDialogTrigger>
                <div className="cursor-pointer flex justify-center items-center gap-1 bg-red-700 hover:bg-red-800 duration-300 px-6 py-[8px] rounded-full">
                  <Trash width={16} height={16} />
                  <p className="text-white text-sm">delete board</p>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-[300px] sm:max-w-[550px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your board from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBoardDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <VisuallyHidden>
                <DialogDescription>Add a new task.</DialogDescription>
              </VisuallyHidden>
              <div className="pt-4 flex flex-col justify-center items-start w-full gap-4">
                <Label>Task Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Label>Task Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <DialogClose>
                  <div
                    onClick={handleSubmit}
                    className="btn_create flex justify-center items-center gap-1"
                  >
                    <Plus width={16} height={16} />
                    <p className="text-sm">Add New Task</p>
                  </div>
                </DialogClose>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div
          className="grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2 lg:grid-cols-3 w-full max-h-[calc(100vh-146px)] overflow-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <CardContainer title="TODO">{renderTasks("TODO")}</CardContainer>
          <CardContainer title="DOING">{renderTasks("DOING")}</CardContainer>
          <CardContainer title="DONE">{renderTasks("DONE")}</CardContainer>
        </div>
      </div>
    </section>
  );
};

export default Board;
