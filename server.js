const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const isAuthenticated = require("./middleware/auth");
const app = express();

const DB = require("./database");
dotenv.config({ path: "./config.env" });

let ready = false;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  // Reject any incoming requests if server is not ready
  if (!ready) return res.sendStatus(500);
  next();
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/register", require("./router/register"));
app.use("/login", require("./router/login"));

app.use("/userdata", isAuthenticated, require("./router/createRecord"));

app.listen(8000, async () => {
  try {
    await DB();
    console.log("Database Connection successful");
    console.log("server is running on port 8000");
    ready = true;
  } catch (error) {
    console.log(err, "Database Connection failed, exiting");
    process.exit();
  }
});
