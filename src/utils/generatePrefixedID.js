import { getRandomValues } from "node:crypto";

function generatePrefixedID() {
  const randomPrefix = getRandomValues(new Uint8Array(1));

  return `${randomPrefix}-${Date.now()}`;
}

export default generatePrefixedID;
