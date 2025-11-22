import { NextResponse } from "next/server";
import { sendOtpEmail } from "../../../../utils/sendOtp";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const otp = Math.floor(100000 + Math.random() * 900000);

  global.tempOtpStore = global.tempOtpStore || {};
  global.tempOtpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  const res = await sendOtpEmail(email, otp);

  if (!res.success) {
    return NextResponse.json({ error: res.error }, { status: 500 });
  }

  return NextResponse.json({ message: "OTP sent to email!" });
}
