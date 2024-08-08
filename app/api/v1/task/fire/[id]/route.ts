import { connectDb } from "@/utils/database";
import { Task } from "@/models/task";

interface Props {
  id: string;
}

export const PUT = async (request: Request, { params }: { params: Props }) => {
  try {
    await connectDb();
    const task = await Task.findById(params.id);

    if (!task)
      return new Response("No task found with this id", { status: 400 });

    const doneTask = await Task.findByIdAndUpdate(
      params.id,
      {
        status: "DOING",
      },
      { new: true }
    );

    return new Response(JSON.stringify({ doneTask: doneTask }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error updating task", { status: 500 });
  }
};
