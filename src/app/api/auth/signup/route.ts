import connectDB from "@/utils/db";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/mail";

connectDB();

export async function POST(request: NextRequest) {
  try {
    // 1. get the data from frontend
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // 2. validate
    if (!username || !email || !password) {
      console.log("missing data");
      return;
    }

    // 3. check user alreay exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 },
      );
    }

    // 4. create user ( password should be hashed )
    const user = await User.create({
      username,
      email,
      password,
    });
    console.log(user);

    // 5. send verification email
    await sendEmail({
      emailTo: email,
      emailType: "VERIFY",
      userId: user._id,
    });

    // error and success message should be standardised
    return NextResponse.json({ message: "User signup done" }, { status: 201 });
  } catch (error: any) {
    console.log("Error : ", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
