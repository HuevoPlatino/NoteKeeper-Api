const toDTO = ({ _id, created_at, ...restOfNote }) => ({
  id: _id,
  createdAt: created_at,
  ...restOfNote
});

const noteMapper = {
  toDTO
};

export default noteMapper;
