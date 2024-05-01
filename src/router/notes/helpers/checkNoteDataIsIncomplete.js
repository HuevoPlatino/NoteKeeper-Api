const checkNoteDataIsIncomplete = (note) => {
  return (
    !note?.name ||
    !note?.name?.trim() ||
    !note?.description ||
    !note?.description?.trim() ||
    !note?.important ||
    !note?.status ||
    !note?.status?.trim() ||
    !note?.dueDate ||
    !note?.dueDate?.trim()
  );
};

export default checkNoteDataIsIncomplete;
