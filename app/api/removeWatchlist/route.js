import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User2 from "@/utils/models/User2";

export async function POST(req, res) {
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
    const updatedWatchlist = user.watchlist.filter(
      (fav) => fav.id !== movie.id
    );
    user.watchlist = updatedWatchlist;
    await user.save();
    return NextResponse.json({ message: "Movie removed from favorites" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
