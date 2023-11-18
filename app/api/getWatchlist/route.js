import { NextResponse } from "next/server";
import User2 from "@/utils/models/User2";
import connectDB from "@/utils/connectDB";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  try {
    const clerk_id = searchParams.get("clerk_id");
    const user = await User2.findOne({ clerk_id });
    if (!user) {
      console.log("User not found for clerk_id:", clerk_id);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ watchlist: user.watchlist });
  } catch (err) {
    console.error("Error fetching watchlist:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
