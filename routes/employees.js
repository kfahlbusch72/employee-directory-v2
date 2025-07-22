import express from "express";
import employees from "../db/employees";

const router = express.Router();

router.ger("/", (req, res) => {
  res.send(employees);
});

router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  const newId = Math.max(...employees.map((e) => e.id)) + 1;
  const newEmployee = { id: newId, name };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

export default router;
