import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  password: String,
  email: String,
  createdAt: String,
});

export default mongoose.model("User", userSchema);
