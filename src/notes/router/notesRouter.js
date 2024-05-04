import { Router } from "express";

import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote
} from "../controllers/index.js";

const createNotesRouter = (repository) => {
  const notesRouter = Router();

  notesRouter.get("/", getAllNotes(repository));
  notesRouter.post("/", createNote(repository));
  notesRouter.put("/:id", updateNote(repository));
  notesRouter.delete("/:id", deleteNote(repository));

  return notesRouter;
};

const notesRouterIoC = (app, repository) => {
  const notesRouter = createNotesRouter(repository);

  app.use("/notes", notesRouter);
};

export default notesRouterIoC;
