"use client";

import { X, CircleAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState, FormEvent } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "../utils/Loader";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const fetchAllBoards = async () => {
    try {
      const response = await axios.get("/api/v1/board");
      return response.data.boards;
    } catch (error) {
      console.error("Error fetching boards:", error);
      return [];
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setError(true);
        console.error(result.error);
      }
      if (result?.ok) {
        const boards = await fetchAllBoards();

        if (boards.length === 0) {
          router.push("/dashboard");
        } else {
          const latestBoard = boards[0];
          router.push(`/dashboard/${latestBoard._id}`);
        }
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">
          Sign in to your account
        </h1>
        <p className="text-xs sm:text-sm">build your awesome kanban board</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4 mb-3 w-[300px] sm:w-[400px]"
      >
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#2c2c38]"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-[#2c2c38]"
        />
        {error && (
          <div className="p-3 bg-red-700 flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <CircleAlert width={18} height={18} />
              <p className="text-[12px]">INVALID CREDENTIALS!</p>
            </div>
            <button type="button" onClick={() => setError(false)}>
              <X width={18} height={18} />
            </button>
          </div>
        )}
        <Button
          type="submit"
          className="flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? <Loader /> : <p>Sign in</p>}
        </Button>
      </form>
      <Link href="/register">
        <p className="text-sm hover:underline">
          don't have an account? register
        </p>
      </Link>
    </div>
  );
};

export default Login;
