import express from "express";
const router = express.Router();
export default router;
import {
  createEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} from "#db/queries/employees";

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.get("/:id", async (req, res) => {
  const employee = await getEmployee(req.params.id);
  if (!employee) {
    return res.status(404).send();
  }
  res.send(employee);
});

router.post("/", async (req, res) => {
  const { name, birthday, salary } = req.body || {};
  if (!name || !birthday || !salary) {
    return res.status(400).send();
  }
  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

router.delete("/:id", async (req, res) => {
  const employee = await deleteEmployee(req.params.id);
  if (!employee) {
    return res.status(404).send();
  }
  res.status(204).send();
});

router.put("/:id", async (req, res) => {
  const { name, birthday, salary } = req.body || {};
  if (!name || !birthday || !salary) {
    return res.status(400).send();
  }
  const employee = await updateEmployee({
    id: req.params.id,
    name,
    birthday,
    salary,
  });
  if (!employee) {
    return res.status(404).send();
  }
  res.status(200).send(employee);
});
