import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User2 from "@/utils/models/User2";

export async function POST(req) {
  await connectDB();
  const user = await req.json();
  const { email, clerk_id } = user;
  try {
    await User2.create({ email, clerk_id });
    return NextResponse.json({ message: "New user created" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
