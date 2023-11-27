import express, { Request, Response } from "express";
import dashboardRouter from "./routes/dashboard";
import dashboardV2Router from "./routes/dashboardV2";
const app = express();
import cors from "cors";

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

app.listen(8080, () => console.log("Server running on port 8080"));
