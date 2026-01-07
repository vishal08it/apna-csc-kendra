import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    collection: "User", // 🔥 MUST MATCH ATLAS
  }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);