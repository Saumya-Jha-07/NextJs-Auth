"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await axios.post("/api/auth/signup", {
      email,
      username,
      password,
    });

    // yaha checks lagane the + try-catch

    setEmail("");
    setPassword("");
    setUsername("");

    console.log(res.data);

    router.push("/login");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-y-5">
        <h1 className="text-3xl text-gray-400 ">Signup</h1>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex justify-center items-center flex-col"
        >
          <h3>Username</h3>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-amber-400 p-2 m-2 text-white focus:outline-0"
          />
          <h3>Email</h3>
          <input
            type="email"
            placeholder="example@google.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-amber-400 p-2 m-2 text-white focus:outline-0"
          />
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-amber-400 p-2 m-2 text-white focus:outline-0"
          />
          <button
            className="text-black bg-white rounded-lg my-5 px-3 py-1"
            type="submit"
          >
            Signup
          </button>
        </form>
        <Link href="/login" className="btn">
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default page;
