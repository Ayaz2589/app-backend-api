import express, { Request, Response } from "express";
import dashboardRouter from "./routes/dashboard";

const app = express();

app.get("/status", (req: Request, res: Response) => {
  res.status(200).send("API is running");
});

app.use("/api/dashboard", dashboardRouter);

app.listen(8080, () => console.log("Server running on port 8080"));
