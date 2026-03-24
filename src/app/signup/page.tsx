import Link from "next/link";

function page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-y-5">
        <h1 className="text-3xl text-gray-400 ">Signup</h1>
        <form
          method="post"
          className="flex justify-center items-center flex-col"
        >
          <h3>Username</h3>
          <input
            type="text"
            placeholder="Enter your name"
            className="border border-amber-400 p-2 m-2 text-white focus:outline-0"
          />
          <h3>Email</h3>
          <input
            type="email"
            placeholder="example@google.com"
            className="border border-amber-400 p-2 m-2 text-white focus:outline-0"
          />
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Enter your password"
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
