import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  const employees = [];
  for (let i = 1; i <= 10; i++) {
    const employees = await createEmployee("Employee" + i, "1990/6/27", 50000);
  }
  return employees;
}
