require("dotenv").config();

const express = require("express");
const app = express();
const connectToDb = require("./utils/db");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");
const fileRoutes = require("./routes/file");

connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("./uploads"));
app.use("/auth", authRoutes);
app.use("/file", fileRoutes);
app.use(errorHandler);

app.get("/", (req, res) => res.send("Server is UP"));

app.listen(process.env.CONTENT_SERVER_PORT, console.log("Content Server Started at Port 3000"));
