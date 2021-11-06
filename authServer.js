require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const connectToDb = require("./utils/db");
const asyncHandler = require("./middlewares/asyncHandler");
const errorHandler = require("./middlewares/errorHandler");

connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

let refreshTokens = [];

app.post("/token", async (req, res) => {
  // Authenticate User
  const { refreshToken } = req.body;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next({ message: `No user found for ID ${decoded.id}` });
    }
    const { accessToken } = user.getJwtToken();

    res.json({ accessToken: accessToken });
  });
});

app.delete("/logout", async (req, res) => {
  try {
    let decoded = await jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    console.log(`${user.username}`);
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    console.log(`${user.username} logged out`);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  // Authenticate User
  const { email, password } = req.body;

  // make sure the email, pw is not empty
  if (!email || !password) {
    return next({
      message: "Please provide email and password",
      statusCode: 400,
    });
  }

  // check if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    return next({
      message: "The email is not yet registered to an accout",
      statusCode: 400,
    });
  }

  // if exists, make sure the password matches
  const match = await user.checkPassword(password);

  if (!match) {
    return next({ message: "The password does not match", statusCode: 400 });
  }
  const { accessToken, refreshToken } = user.getJwtToken();
  refreshTokens.push(refreshToken);
  console.log(`${user.username} logged in`);
  // then send json web token as response
  res.status(200).json({ success: true, accessToken, refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "35s" });
}

app.listen(4000, console.log("Authentication Server started at Port 4000"));
