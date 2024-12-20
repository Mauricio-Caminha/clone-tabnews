import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 AS result");
  console.log(result.rows[0]);
  response.status(200).json({ status: "OK" });
}

export default status;
