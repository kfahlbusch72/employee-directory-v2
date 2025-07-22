import express from "express";
const app = express();
export default app;

import employeesRouter from "./routes/employees.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});
