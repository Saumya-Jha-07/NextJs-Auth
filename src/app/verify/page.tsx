"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const router = useRouter();

  const verifyUser = async () => {
    if (!token) return;

    const res = await fetch("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    router.push("/login");

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={verifyUser}>Verify Email</button>
    </div>
  );
}
