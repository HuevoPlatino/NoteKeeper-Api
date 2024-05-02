import testServer from "../../../test/testServer";
import { inMemoryNotesRepository } from "../../repositories/inMemoryNotesRepository";
import notesRouterIoC from "./notesRouter";

const MOCKS = {
  NOTE_ID: "mockedID-123",
  DATE_NOW: 39600000
};

const initialNote = {
  _id: "123",
  name: "name",
  description: "description",
  important: false,
  status: "pending",
  due_date: "5/1/2024",
  created_at: 1714552849902
};

const initialNoteDTO = {
  id: "123",
  name: "name",
  description: "description",
  important: false,
  status: "pending",
  due_date: "5/1/2024",
  createdAt: 1714552849902
};

const newNote = {
  name: "Wash dishes",
  description: "Washing machine is out of order",
  important: true,
  status: "pending",
  dueDate: "1/1/2024"
};

const newNoteDTO = {
  ...newNote,
  id: MOCKS.NOTE_ID,
  createdAt: MOCKS.DATE_NOW
};

const mockNotes = [initialNote];

const notesRepository = inMemoryNotesRepository(mockNotes);
const notesRouter = testServer(notesRouterIoC, notesRepository);

jest.mock("../../utils/index.js", () => {
  const noteId = "mockedID-123";

  return {
    generatePrefixedID: jest.fn().mockReturnValue(noteId)
  };
});

jest.useFakeTimers("modern");

describe("notesRouter", () => {
  const EXPECTED_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400
  };

  const EXPECTED_ERROR_MESSAGE = {
    CREATED: "Missing data."
  };

  const EXPECTED_RESPONSE_DTO = {
    READ: [initialNoteDTO],
    CREATED: newNoteDTO
  };

  beforeEach(() => {
    jest.setSystemTime(MOCKS.DATE_NOW);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("Given GET action", () => {
    test("When request is received Then response should return notes collection with status 200", async () => {
      const { status, body } = await notesRouter.get("/notes");
      const { notes } = body;

      expect(status).toBe(EXPECTED_STATUS.OK);
      expect(notes).toHaveLength(EXPECTED_RESPONSE_DTO.READ.length);
      expect(notes).toEqual(EXPECTED_RESPONSE_DTO.READ);
    });
  });

  describe("Given POST action", () => {
    test("When a new note is sent with missing name Then response should return status 404 with expected error message", async () => {
      const { name, ...newNoteWithMissingName } = newNote;

      const { status, body } = await notesRouter
        .post("/notes")
        .send(newNoteWithMissingName);

      expect(status).toBe(EXPECTED_STATUS.BAD_REQUEST);
      expect(body.error).toBe(EXPECTED_ERROR_MESSAGE.CREATED);
    });

    test("When a new note is sent with missing description Then response should return status 404 with expected error message", async () => {
      const { description, ...newNoteWithMissingDescription } = newNote;

      const { status, body } = await notesRouter
        .post("/notes")
        .send(newNoteWithMissingDescription);

      expect(status).toBe(EXPECTED_STATUS.BAD_REQUEST);
      expect(body.error).toBe(EXPECTED_ERROR_MESSAGE.CREATED);
    });

    test("When a new note is sent with missing important Then response should return status 404 with expected error message", async () => {
      const { important, ...newNoteWithMissingImportant } = newNote;

      const { status, body } = await notesRouter
        .post("/notes")
        .send(newNoteWithMissingImportant);

      expect(status).toBe(EXPECTED_STATUS.BAD_REQUEST);
      expect(body.error).toBe(EXPECTED_ERROR_MESSAGE.CREATED);
    });

    test("When a new note is sent with missing status Then response should return status 404 with expected error message", async () => {
      const { status: noteStatus, ...newNoteWithMissingStatus } = newNote;

      const { status, body } = await notesRouter
        .post("/notes")
        .send(newNoteWithMissingStatus);

      expect(status).toBe(EXPECTED_STATUS.BAD_REQUEST);
      expect(body.error).toBe(EXPECTED_ERROR_MESSAGE.CREATED);
    });

    test("When a new note is sent with missing dueDate Then response should return status 404 with expected error message", async () => {
      const { dueDate, ...newNoteWithDueDate } = newNote;

      const { status, body } = await notesRouter
        .post("/notes")
        .send(newNoteWithDueDate);

      expect(status).toBe(EXPECTED_STATUS.BAD_REQUEST);
      expect(body.error).toBe(EXPECTED_ERROR_MESSAGE.CREATED);
    });

    test("When a new note is sent with complete data Then response should return status 201 with new note and note should be stored", async () => {
      const { status, body } = await notesRouter.post("/notes").send(newNote);

      expect(status).toBe(EXPECTED_STATUS.CREATED);
      expect(body).toEqual(EXPECTED_RESPONSE_DTO.CREATED);

      const {
        body: { notes }
      } = await notesRouter.get("/notes");

      expect(notes).toHaveLength(EXPECTED_RESPONSE_DTO.READ.length + 1);
      expect(JSON.stringify(notes)).toContain("Wash dishes");
    });
  });

  describe("Given PUT action", () => {
    test.todo("When Then");
  });

  describe("Given DELETE action", () => {
    test.todo("When Then");
  });
});
