require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const connectToDb = require("./utils/db");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");

connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRoutes);
app.use(errorHandler);

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
  {
    username: "Roshan",
    title: "Post 3",
  },
];

app.get("/", (req, res) => res.send("Server is UP"));

// app.get("/posts", authenticateToken, (req, res) => {
//   res.json(posts.filter((post) => post.username === req.user.name));
// });

// app.post("/login", (req, res) => {
//   const username = req.body.username;
//   const user = { name: username };
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken });
// });

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     console.log(err);
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

app.listen(3000, console.log("Content Server Started at Port 3000"));
