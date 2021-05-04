const { Router } = require("express");
const router = Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => res.send("Hola Ariel Tecay"));

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.status(401).json("User already exist");

  const newUser = new User({ email, password });
  await newUser.save();
  const token = jwt.sign({ _id: newUser._id }, "secretKey");
  res.status(200).json({ token });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("The Mail doesn´t exist");
  if (user.password !== password) return res.status(401).send("Wrong Password");

  const token = jwt.sign({ _id: user._id }, "secretKey");
  res.status(200).json({ token });
});

router.get("/tasks", (req, res) => {
  res.json([
    {
      _id: 1,
      name: "task One",
      description: "Lorem",
    },
    {
      _id: 2,
      name: "task two",
      description: "Lorem two",
    },
    {
      _id: 3,
      name: "task Three",
      description: "Lorem three",
    },
  ]);
});
router.get("/private-tasks", verifyToken, (req, res) => {
  res.json([
    {
      _id: 1,
      name: "task One",
      description: "Lorem",
    },
    {
      _id: 2,
      name: "task two",
      description: "Lorem two",
    },
    {
      _id: 3,
      name: "task Three",
      description: "Lorem three",
    },
  ]);
});
router.get("/profile", verifyToken, (req, res) => {
  res.send(req.email);
});

module.exports = router;

function verifyToken(req, res, next) {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send("UnAuthorization Request");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    res.status(401).send("UnAuthorization Request");
  }

  const payload = jwt.verify(token, "secretKey");
  req.userId = payload._id;
  next();
}
