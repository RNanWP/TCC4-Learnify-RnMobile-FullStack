// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   testMatch: ["**/src/tests/**/*.test.ts"],
//   testPathIgnorePatterns: ["/node_modules/", "/dist/"],
//   setupFilesAfterEnv: ["./jest.setup.ts"],
// };

/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  modulePathIgnorePatterns: ["<rootDir>/dist"],
};
