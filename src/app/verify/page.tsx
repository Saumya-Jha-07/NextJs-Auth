"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const verifyUser = async () => {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      router.push("/");

      const data = await res.json();
      console.log(data);
    };

    verifyUser();
  }, [token]);

  return <div>Verifying...</div>;
}
