import { connectDb } from "@/utils/database";
import { Task } from "@/models/task";

export const GET = async (request: Request) => {
  try {
    await connectDb();
    const tasks = await Task.find();
    if (!tasks) return new Response("No tasks found.", { status: 200 });

    return new Response(JSON.stringify({ tasks: tasks }));
  } catch (error) {
    console.log(error);
    return new Response("Error fetching all Tasks", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectDb();

    const { title, description, board } = await request.json();

    if (!title || !description)
      return new Response("Title or Description is missing!", { status: 400 });
    const newTask = await Task.create({
      title: title,
      description: description,
      board: board,
    });

    return new Response(
      JSON.stringify({
        message: "Task created successfully",
        newTask: newTask,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response("Error creating a new Task", { status: 500 });
  }
};
