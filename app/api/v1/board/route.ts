import { connectDb } from "@/utils/database";
import { Board } from "@/models/board";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

export const GET = async () => {
  try {
    await connectDb();
    const session = await getServerSession(options);
    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const boards = await Board.find({ user: session?.user.id }).sort({
      createdAt: -1,
    });
    return new Response(JSON.stringify({ boards: boards }), { status: 200 });
  } catch (error) {
    return new Response("Error fetching all boards", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectDb();
    const session = await getServerSession(options);

    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { name } = await request.json();

    if (!name) return new Response("Name is missing!", { status: 400 });

    const newBoard = await Board.create({
      name: name,
      user: session.user.id,
    });

    return new Response(
      JSON.stringify({
        message: "Board created successfully",
        newBoard: newBoard,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response("Error creating new board", { status: 500 });
  }
};
