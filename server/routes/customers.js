const express = require("express");
const { z } = require("zod");

const generateId = require("../utils/generateId");
const HttpError = require("../utils/httpError");

const router = express.Router();

const customers = [];

const customerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().trim().min(1, "Phone is required").max(30, "Phone is too long"),
});

router.get("/", (req, res) => {
  const q = (req.query.q || "").toLowerCase().trim();
  if (!q) return res.json(customers);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q)
  );
  res.json(filtered);
});

router.post("/", (req, res) => {
  const result = customerSchema.safeParse(req.body);

  if (!result.success) {
    const messages = result.error.issues.map((i) => i.message).join(", ");
    throw new HttpError(400, messages);
  }

  const customer = {
    id: generateId(),
    ...result.data,
    createdAt: new Date().toISOString(),
  };
  customers.unshift(customer);
  res.status(201).json(customer);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = customers.findIndex((c) => c.id === id);

  if (index === -1) {
    throw new HttpError(404, "Customer not found");
  }

  const [removed] = customers.splice(index, 1);
  res.json(removed);
});

module.exports = router;
