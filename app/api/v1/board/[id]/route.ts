import { connectDb } from "@/utils/database";
import { Board } from "@/models/board";
import { Task } from "@/models/task";

interface Props {
  id: string;
}

export const GET = async (request: Request, { params }: { params: Props }) => {
  try {
    await connectDb();
    const board = await Board.findById(params.id);
    if (!board) {
      return new Response("Board not found", { status: 404 });
    }
    return new Response(JSON.stringify({ board: board }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Error fetching the board", { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Props }
) => {
  try {
    await connectDb();
    await Task.deleteMany({ board: params.id });
    const board = await Board.findByIdAndDelete(params.id);

    if (!board) {
      return new Response("No board found with this id!", { status: 400 });
    }

    return new Response(
      JSON.stringify({
        message: "Board Deleted Successfully",
        deletedBoard: board,
      })
    );
  } catch (error) {
    console.log("Error Deleting this board: ", error);
    return new Response("Error Deleting this board", { status: 500 });
  }
};
