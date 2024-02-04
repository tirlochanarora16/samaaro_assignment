import express from "express";
import initDB from "./db/connection.js";
import tasksRoutes from "./routes/tasks.router.js";

const app = express();

const PORT = 3000;

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception happened!", err.message);
});

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `http://localhost:3001`);
  res.header(`Access-Control-Allow-Methods`, `GET,PATCH,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});
app.use(express.json());
app.use("/tasks", tasksRoutes);

app.listen(PORT, () => {
  initDB();
  console.log(`Server running on ${PORT} 🚀!`);
});
