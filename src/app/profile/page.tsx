"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const [user, setUser] = useState<any>("");

  const router = useRouter();

  useEffect(() => {
    async function getUserDetails() {
      const res = await axios.get("/api/auth/profile");

      console.log(res.data.data);

      setUser(res.data.data);
    }

    getUserDetails();
  }, []);

  async function logoutUser() {
    const res = await axios.post("/api/auth/logout");

    console.log(res);

    router.push("/");
  }

  return (
    <div className="flex justify-center items-center gap-4 flex-col h-screen">
      <h1>User id : {user._id}</h1>
      <button
        className="text-black bg-white rounded-lg my-5 px-3 py-1"
        onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  );
}

export default page;
