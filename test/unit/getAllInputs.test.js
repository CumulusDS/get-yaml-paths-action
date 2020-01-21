// @flow

import getAllInputs from "../../src/getAllInputs";

describe("getAllInputs", () => {
  const OLD_ENV = process.env;

  it("includes environment that begin with INPUT_", () => {
    process.env = { INPUT_A: "a", INPUT_B: "b", NOT_INPUT_C: "c" };
    expect(getAllInputs()).toEqual({ a: "a", b: "b" });
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
});
