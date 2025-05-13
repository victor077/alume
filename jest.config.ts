import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/*.spec.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.spec.ts"],
  coverageDirectory: "coverage",
  clearMocks: true,
};

export default config;
