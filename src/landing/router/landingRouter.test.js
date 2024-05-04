import testServer from "../../../test/testServer";
import landingRouterIoC from "./landingRouter";

const landingRouter = testServer(landingRouterIoC);

describe("landingRouter", () => {
  describe("Given GET action", () => {
    test("When request is received and server is up then response should return OK", async () => {
      const { status, text } = await landingRouter.get("/");

      expect(status).toBe(200);
      expect(text).toContain("👋 Notekeeper API");
    });
  });
});
