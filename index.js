import chalk from "chalk";
import cors from "cors";
import express from "express";

import healthRouterIoC from "./src/health/router/healthRouter.js";
import landingRouterIoC from "./src/landing/router/landingRouter.js";
import notesRouterIoC from "./src/notes/router/notesRouter.js";

import { Logger } from "./src/utils/index.js";

const PORT = process.env.PORT ?? 3001;
const appVersion = process.env.npm_package_version;

const app = express();
app.use(express.json());
app.use(cors());

landingRouterIoC(app, appVersion);
healthRouterIoC(app);
notesRouterIoC(app);

app.listen(PORT, () => {
  Logger.lineDivider();
  Logger.lineFeed();
  Logger.log(
    chalk.yellow("👋", chalk.bold("Notekeeper API"), `v.${appVersion} is up!`)
  );
  Logger.lineFeed();
  Logger.log(chalk.green(`🚀 Server running at http://localhost:${PORT} ...`));
  Logger.lineFeed();
  Logger.lineDivider();
});
