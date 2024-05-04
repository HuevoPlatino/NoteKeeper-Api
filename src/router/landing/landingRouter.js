import { Router } from "express";

const createLandingRouter = (appVersion) => {
  const landingRouter = Router();

  landingRouter.get("/", (_req, res) => {
    res.send(`👋 Notekeeper API :: v${appVersion}`);
  });

  return landingRouter;
};

const landingRouterIoC = (app, appVersion) => {
  const landingRouter = createLandingRouter(appVersion);

  app.use("/", landingRouter);
};

export default landingRouterIoC;
