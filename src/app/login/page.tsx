"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";

function page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });

    setEmail("");
    setPassword("");

    console.log("Response : ", res);
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-y-5">
        <h1 className="text-3xl text-gray-400 ">Login</h1>
        <form
          method="post"
          className="flex justify-center items-center flex-col"
          onSubmit={handleSubmit}
        >
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
            Login
          </button>
        </form>
        <Link href="/signup" className="btn">
          Go to Signup
        </Link>
      </div>
    </div>
  );
}

export default page;
