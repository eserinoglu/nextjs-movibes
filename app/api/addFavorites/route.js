import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User2 from "@/utils/models/User2";

export async function POST(req) {
  const { clerk_id, movie } = await req.json();
  try {
    const user = await User2.findOne({ clerk_id });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (user.favorites.includes(movie.id)) {
      return NextResponse.json(
        { error: "Movie already in favorites" },
        { status: 400 }
      );
    }
    user.favorites.push(movie);
    await user.save();
    return NextResponse.json({ message: "Movie added to favorites" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
