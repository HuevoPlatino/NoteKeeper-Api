import { noteMapper } from "../../mappers/index.js";
import {
  checkNoteDataIsIncomplete,
  generatePrefixedID
} from "../../utils/index.js";

const createNote = (repository) => {
  return (req, res) => {
    const note = req.body;

    const isNoteDataIncomplete = checkNoteDataIsIncomplete(note);

    if (isNoteDataIncomplete) {
      return res.status(400).json({ error: "Missing data." });
    }

    const newNote = {
      ...note,
      _id: generatePrefixedID(),
      created_at: Date.now()
    };

    repository.addNote(newNote);

    const noteDTO = noteMapper.toDTO(newNote);

    return res.status(201).json(noteDTO);
  };
};

export default createNote;
