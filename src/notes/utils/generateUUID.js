import { randomUUID } from "node:crypto";

function generateUUID() {
  const uuid = randomUUID();

  debugger;

  return uuid;
}

export default generateUUID;
