import { connectDb } from "@/utils/database";
import { Task } from "@/models/task";

interface Props {
  id: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: Props }
) => {
  try {
    await connectDb();
    const task = await Task.findById(params.id);

    if (!task)
      return new Response("No task found with this id", { status: 400 });
    console.log("Sweet ID : ", params.id);
    const deletedTask = await Task.findByIdAndDelete(params.id);
    return new Response(
      JSON.stringify({
        message: "Task deleted successfully",
        deletedTask: task,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response("Error deleting task", { status: 500 });
  }
};
