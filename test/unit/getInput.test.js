// @flow

import getInput from "../../src/getInput";

describe("getInput", () => {
  const OLD_ENV = process.env;

  it("includes environment that begin with INPUT_", () => {
    process.env = { INPUT_FILE: "file", INPUT_A: "a", INPUT_B: "b", NOT_INPUT_C: "c" };
    expect(getInput()).toEqual({ file: "file", paths: { a: "a", b: "b" } });
  });

  it("throws if file is not given", () => {
    process.env = { INPUT_A: "a", INPUT_B: "b", NOT_INPUT_C: "c" };
    expect(() => getInput()).toThrow("The 'file' input is required.");
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
});
