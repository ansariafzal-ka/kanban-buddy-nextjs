"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CircleAlert, X } from "lucide-react";
import Loader from "../utils/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/v1/user", {
        name: name,
        email: email,
        password: password,
      });
      console.log(response.data);

      if (response.status === 201) {
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || "An error occurred";
        console.error(errorMessage);
        setError(true);
        setLoading(false);
      } else {
        console.error("An unexpected error occurred");
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">
          Sign up to create an account
        </h1>
        <p className="text-xs sm:text-sm">build your awesome kanban board</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4 mb-3 w-[300px] sm:w-[400px]"
      >
        <Input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#2c2c38]"
          required
        />
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#2c2c38]"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#2c2c38]"
          required
        />
        {error && (
          <div className="p-3 bg-red-700 flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <CircleAlert width={18} height={18} />
              <p className="text-[12px]">EMAIL ALREADY EXISTS!</p>
            </div>
            <button type="button" onClick={() => setError(false)}>
              <X width={18} height={18} />
            </button>
          </div>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : <p>Sign up</p>}
        </Button>
      </form>
      <Link href="/">
        <p className="text-sm hover:underline">
          already have an account? login
        </p>
      </Link>
    </div>
  );
};

export default Register;
