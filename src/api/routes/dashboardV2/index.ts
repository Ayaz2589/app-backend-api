import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

interface User {
  name: string;
  password: string;
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
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/list", (req, res) => {
  res.json(users);
});

router.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
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
