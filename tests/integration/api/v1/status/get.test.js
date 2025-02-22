import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymouse user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toBe(parsedUpdatedAt);

      expect(responseBody.dependencies.database.version).toEqual("16.0");
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.current_connections).toEqual(1);
    });

    test.skip("Trying a SQL Injection", async () => {
      await fetch("http://localhost:3000/api/v1/status?databaseName=local_db");
      await fetch(
        "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --",
      );
    });
  });
});
