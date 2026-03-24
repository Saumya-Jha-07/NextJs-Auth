import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      home page
      <Link
        href="/login"
        className="px-4 py-2 rounded-lg border-2 border-blue-500 bg-slate-600 hover:bg-slate-500 hover:text-black"
      >
        Go to Login
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 rounded-lg border-2 border-blue-500 bg-slate-600 hover:bg-slate-500 hover:text-black"
      >
        Go to Signup
      </Link>
    </div>
  );
}
