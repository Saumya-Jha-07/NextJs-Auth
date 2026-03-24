import nodemailer from "nodemailer";
import crypto from "crypto";
import { User } from "@/models/user.model";

export const sendEmail = async ({ emailTo, emailType, userId }: any) => {
  try {
    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 1000 * 60 * 10,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 1000 * 60 * 10,
      });
    }

    // 1. transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bf4ec1126bff94", // ❌ ye .env mai hona chahiye
        pass: "c45a39d8f4448e",
      },
    });

    // 2. define email structure
    const html_based_on_type: any = {
      VERIFY: `<a href="${process.env.DOMAIN}/verify?token=${rawToken}">Verify</a>`,
      RESET: `<a href="${process.env.DOMAIN}/reset?token=${rawToken}">Reset</a>`,
    };

    const mailOptions = {
      from: "sjboss7march@gmail.com",
      to: emailTo,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: html_based_on_type[emailType],
    };

    // 3. send email
    const info = await transporter.sendMail(mailOptions);
    console.log("message Sent : ", info);

    return info;
  } catch (error: any) {
    console.log("error : ", error.message);
  }
};
