import cors from "cors";
import express from "express";

import healthRouterIoC from "./src/health/router/healthRouter.js";
import landingRouterIoC from "./src/landing/router/landingRouter.js";
import notesRouterIoC from "./src/notes/router/notesRouter.js";

import NotesInMemoryRepository from "./src/notes/repository/NotesInMemoryRepository.js";
import { Logger } from "./src/utils/index.js";

const PORT = process.env.PORT ?? 3001;
const appVersion = process.env.npm_package_version;

const notesInMemoryRepository = NotesInMemoryRepository();

const app = express();
app.use(express.json());
app.use(cors());

landingRouterIoC(app, appVersion);
healthRouterIoC(app);
notesRouterIoC(app, notesInMemoryRepository);

app.listen(PORT, () => {
  Logger.logServerRun({ appVersion, port: PORT });
});
