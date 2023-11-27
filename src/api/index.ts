import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dashboardRouter from "./routes/dashboard";
import dashboardV2Router from "./routes/dashboardV2";
import { User } from "../db/models";

dotenv.config();
const app = express();
mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 8080;
const CONNECTION = process.env.CONNECTION || "";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/status", (req: Request, res: Response) => {
  res.status(200).send("API is running");
});

app.use("/api/dashboard", dashboardRouter);
app.use("/api/dashboardv2", dashboardV2Router);

app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      createdAt: new Date().toISOString(),
    });
    await user.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
