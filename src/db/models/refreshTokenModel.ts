import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: String,
});

export default mongoose.model("refreshTokens", refreshTokenSchema);
