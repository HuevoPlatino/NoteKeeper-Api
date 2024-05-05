import { Router } from "express";

import NotesController from "../controllers/NotesController.js";
import NotesInMemoryRepository from "../repository/NotesInMemoryRepository.js";

const notesInMemoryRepository = NotesInMemoryRepository();
const notesController = NotesController(notesInMemoryRepository);

const createNotesRouter = () => {
  const notesRouter = Router();

  notesRouter.get("/", notesController.getAllNotes);
  notesRouter.post("/", notesController.createNote);
  notesRouter.put("/:id", notesController.updateNote);
  notesRouter.delete("/:id", notesController.deleteNote);

  return notesRouter;
};

const notesRouterIoC = (app) => {
  const notesRouter = createNotesRouter();

  app.use("/notes", notesRouter);
};

export default notesRouterIoC;
