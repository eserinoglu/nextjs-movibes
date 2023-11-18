import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  clerk_id: {
    type: String,
    required: true,
  },
  favorites: {
    type: Array,
    default: [],
  },
  watchlist: {
    type: Array,
    default: [],
  },
});


export default mongoose.models.User2 || mongoose.model("User2", userSchema);
