import testServer from "../../../test/testServer";
import healthRouterIoC from "./healthRouter";

const healthRouter = testServer(healthRouterIoC);

describe("healthRouter", () => {
  describe("Given GET action", () => {
    test("When request is received and server is up then response should return OK", async () => {
      const { status, text } = await healthRouter.get("/health");

      expect(status).toBe(200);
      expect(text).toBe("OK");
    });
  });
});
