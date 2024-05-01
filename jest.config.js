/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: ["js"],
  transform: {
    "^.+\\.m?js$": "babel-jest", // You might need to use Babel to transpile ESM to CommonJS
  },
};

export default config;
