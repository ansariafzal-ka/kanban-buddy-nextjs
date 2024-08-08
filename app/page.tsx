import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Login from "@/components/pages/Login";

const LoginPage = async () => {
  const session = await getServerSession(options);
  if (session) redirect("/dashboard");
  return (
    <main className="w-full h-screen flex justify-center items-center bg_main">
      <Login />
    </main>
  );
};

export default LoginPage;
