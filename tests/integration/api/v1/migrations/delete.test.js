import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("DELETE /api/v1/migrations", () => {
  describe("Anonymouse user", () => {
    test("Attempting to use a not-allowed DELETE method on the route", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "DELETE",
      });

      const responseBody = await response.json();

      expect(response.status).toBe(405);
      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Method not allowed.",
        action: "Verify if the HTTP method is valid for the route.",
        status_code: 405,
      });
    });
  });
});
