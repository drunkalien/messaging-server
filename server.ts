import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import Message from "./model";
import User from "./usersModel";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/send", async (req: Request, res: Response) => {
  try {
    const { from, to, title, body } = req.body;
    to.forEach(async (user: { value: string; label: string }) => {
      const { value: username } = user;
      await Message.create({
        from,
        to: username,
        title,
        body,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/users/:username", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const filteredUsers = users.filter((user) =>
      user.username.includes(req.params.username)
    );

    res.json({
      users: filteredUsers,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      await User.create(req.body);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/messages/:username", async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ to: req.params.username });

    res.json({
      messages,
    });
  } catch (error) {
    console.log(error);
  }
});

const DB = process.env.MONGO_URL || "mongodb://localhost/task5";

mongoose.connect(DB).then(() => console.log("DB connection succesfull"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("app is running on port 5000"));
