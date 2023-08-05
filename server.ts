import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./src/middleware/ErrorHandler";
import { isAuthenticated } from "./src/middleware/auth";
import { DB } from "./database";

const app = express();

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

app.use("/register", require("./src/router/register"));
app.use("/login", require("./src/router/login"));

app.use("/userdata", isAuthenticated, require("./src/router/createRecord"));

app.use(errorHandler);

app.listen(8000, async () => {
  try {
    await DB();
    console.log("Database Connection successful");
    console.log("server is running on port 8000");
    ready = true;
  } catch (error) {
    console.log(error, "Database Connection failed, exiting");
    process.exit();
  }
});
