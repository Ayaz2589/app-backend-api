import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dashboardRouter from "./routes/dashboard";
import authRouter from "./routes/auth";
import { authErrorHandler } from "./middleware";

dotenv.config();
const app = express();
mongoose.set("strictQuery", false);

const PORT = 8080;
const CONNECTION = process.env.CONNECTION || "";

const start = async () => {
  try {
    console.log("CONNECTION: ", CONNECTION);
    await mongoose.connect(CONNECTION);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/status", (req: Request, res: Response) => {
  res.status(200).send("API is running");
});

app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(authErrorHandler);
start();

export default app;
