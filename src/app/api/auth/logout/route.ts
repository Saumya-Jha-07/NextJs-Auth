import { User } from "@/models/user.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

// export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decodedToken: any = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!,
  );

  const user = await User.findById(decodedToken._id);

  await User.findByIdAndUpdate(user._id, {
    $unset: {
      refreshToken: 1,
    },
    $set: {
      isVerified: false,
    },
  });

  const res = NextResponse.json(
    { message: "User logout successfully!" },
    { status: 200 },
  );

  res.cookies.delete("accessToken");
  res.cookies.delete("refreshToken");

  return res;
}
