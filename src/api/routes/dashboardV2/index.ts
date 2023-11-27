import express from "express";
import bcrypt from "bcrypt";
import { User } from "../../../db/models";

const router = express.Router();

interface User {
  email: string;
  password: string;
  createdAt?: string;
}

const users: User[] = [];

router.get("/status", (req, res) => {
  res.status(200).send("Dashboard V2 API is running");
});

router.get("/users", (req, res) => {
  res.json(users);
});

router.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });
    await user.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
  res.status(201).send();
});

router.get("/users/list", (req, res) => {
  res.json(users);
});

router.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send("Success");
    } else {
      res.status(400).send("Not Allowed");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
