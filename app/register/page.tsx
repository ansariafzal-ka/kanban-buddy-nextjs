import Register from "@/components/pages/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";

const RegisterPage = async () => {
  const session = await getServerSession(options);
  if (session) redirect("/dashboard");

  return (
    <main className="w-full h-screen flex justify-center items-center bg_main">
      <Register />
    </main>
  );
};

export default RegisterPage;
