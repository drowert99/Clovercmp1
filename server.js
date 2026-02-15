import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://YOUR_MONGO_URL");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// Регистрация
app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });

  await user.save();
  res.json({ message: "Пользователь создан" });
});

// Логин
app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ message: "Не найден" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json({ message: "Ошибка пароля" });

  const token = jwt.sign({ id: user._id }, "SECRET_KEY");
  res.json({ token });
});

app.listen(5000, () => console.log("Server started"));