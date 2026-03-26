"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const router = useRouter();

  const verifyUser = async () => {
    console.log("Token : ", token);
    if (!token) return;

    const res = await axios.post("/api/auth/verify", { token });

    console.log(res);
    router.push("/login");
  };

  return (
    <div className="h-screen flex justify-center items-center gap-4">
      <button
        onClick={verifyUser}
        className="text-black bg-white rounded-lg my-5 px-3 py-1"
      >
        {token ? "Verify Email" : "Check Email For Link"}
      </button>
    </div>
  );
}
