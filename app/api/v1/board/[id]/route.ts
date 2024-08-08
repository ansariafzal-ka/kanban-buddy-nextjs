import { connectDb } from "@/utils/database";
import { Board } from "@/models/board";

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
