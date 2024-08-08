import { connectDb } from "@/utils/database";
import bcrypt from "bcryptjs";
import { User } from "@/models/user";
import { Board } from "@/models/board";
import { Task } from "@/models/task";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

//POST (Register a new user) /api/v1/user
export const POST = async (request: Request) => {
  try {
    await connectDb();
    const { name, email, password } = await request.json();

    const isUserExists = await User.findOne({ email });
    if (isUserExists)
      return new Response(`User with the email : ${email} already exists!`, {
        status: 400,
      });

    if (!name || !email || !password)
      return new Response("Some fields are missing!", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return new Response(
      JSON.stringify({ message: "User registered", newUser: newUser }),
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating the user!", error);
    return new Response("Error creating the user!", { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    await connectDb();

    const session = await getServerSession(options);
    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    const boards = await Board.find({ user: userId });
    const boardIds = boards.map((board) => board._id);

    await Task.deleteMany({ board: { $in: boardIds } });
    await Board.deleteMany({ user: userId });

    await User.findByIdAndDelete(userId);

    return new Response("User and associated data deleted", { status: 200 });
  } catch (error) {
    console.log("Error deleting the user or associated data!", error);
    return new Response("Error deleting the user or associated data!", {
      status: 500,
    });
  }
};
