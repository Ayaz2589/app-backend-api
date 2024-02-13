import express from "express";
import bcrypt from "bcrypt";
import { User } from "../../../../db/models";
import { UserErrorHandler } from "../../../error";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user != null) throw UserErrorHandler.userAlreadyExists();

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    await newUser.save();
    
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

router.patch("/update-email/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user == null) throw UserErrorHandler.userNotFound();

    const userExists = await User.findOne({ email: req.body.new_email });

    if (userExists != null) throw UserErrorHandler.userAlreadyExists();
  
    const filter = { email: user.email };
    const update = { $set: { email: req.body.new_email } };
  
    const result = await User.updateOne(filter, update);
  
    if (result.acknowledged && result.modifiedCount === 1) {
      res.status(200).send();
      return
    }
    throw UserErrorHandler.unableToUpdateUser();
  } catch (error) {
    next(error);
  }
});

router.patch("/update-password/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user == null) throw UserErrorHandler.userNotFound();
  
    const password: string = user.password || "";
  
    const match = await bcrypt.compare(req.body.old_password, password);
  
    if (!match) throw UserErrorHandler.invalidPassword();
  
    const hashedNewPassword = await bcrypt.hash(req.body.new_password, 10);
  
    const filter = { email: user.email };
    const update = { $set: { password: hashedNewPassword } };
  
    const result = await User.updateOne(filter, update);
  
    if (result.acknowledged && result.modifiedCount === 1) {
      res.status(200).send();
      return;
    }
    throw UserErrorHandler.unableToUpdateUser();
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.get("/list", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
});

router.get("/id-by-email", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  res.status(200).send({ id: user?._id, email: user?.email });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).send({ user });
});

router.get("/check-password/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user == null) {
    return res.status(400).send({ error: "Cannot find user" });
  }

  const password: string = user.password || "";

  const match = await bcrypt.compare(req.body.password, password);

  if (!match) {
    return res.status(400).send({ error: "Incorrect password" });
  }

  res.status(200).send({ message: "Correct password" });
});

export default router;
