import { User } from "@/models/user.model";
import connectDB from "@/utils/db";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  console.log(token);

  if (!token)
    return NextResponse.json({ error: "Token is missing" }, { status: 400 });

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    verifyToken: hashedToken,
    verifyTokenExpiry: { $gt: Date.now() },
  });

  if (!user)
    return NextResponse.json(
      { error: "User token is invalid" },
      { status: 401 },
    );

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;

  await user.save();

  return NextResponse.json(
    {
      message: "User is verified!",
    },
    { status: 200 },
  );
}
