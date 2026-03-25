import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user.model";
import connectDB from "@/utils/db";

connectDB();

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  if (!accessToken)
    return NextResponse.json({ error: "no token" }, { status: 400 });

  const decodedToken: any = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!,
  );

  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken",
  );

  return NextResponse.json(
    { message: "user profile", data: user },
    { status: 200 },
  );
}
