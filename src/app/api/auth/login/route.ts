import connectDB from "@/utils/db";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connectDB();

export const generateAccessToken = (user: { _id: string; email: string }) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
    },
  );
};

export const generateRefreshToken = (user: { _id: string; email: string }) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any,
    },
  );
};

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;

  if (!email || !password) {
    return NextResponse.json(
      { message: "All fields are required!" },
      { status: 400 },
    );
  }

  // validators lagane chahiye for confirmation ki mail hai ya nai , sahi format ya ni

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  // hash krte password to use bcrypt js to compare it
  if (user.password !== password)
    return NextResponse.json({ error: "Incorrect Password" }, { status: 401 });

  // tokens
  const reqUser = {
    _id: user._id,
    email: user.email,
  };
  const accessToken = generateAccessToken(reqUser);
  const refreshToken = generateRefreshToken(reqUser);

  user.refreshToken = refreshToken;
  await user.save();

  const options = {
    httpOnly: true,
    secure: true,
  };

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, options);
  cookieStore.set("refreshToken", refreshToken, options);

  return NextResponse.json(
    { message: "Login successfull", data: user },
    { status: 200 },
  );
}
