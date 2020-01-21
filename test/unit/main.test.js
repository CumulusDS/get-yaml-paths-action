// @flow

import * as core from "@actions/core";
import main from "../../src/main";

jest.mock("process");
jest.mock("@actions/core");

describe("main", () => {
  const OLD_ENV = process.env;

  it("calls setOutput when successful", async () => {
    // core.setOutput = jest.fn();
    process.env = { INPUT_FILE: "env/test.yml", INPUT_A: "foo.bar", INPUT_B: "provider.stage", NOT_INPUT_C: "c" };
    await main();
    expect(core.setOutput.mock.calls).toEqual([["a", "baz"], ["b", "green"]]);
  });

  it("calls setFailed when unsuccessful", async () => {
    // $FlowFixMe
    process.exit = jest.fn();
    // core.setFailed = jest.fn();
    process.env = { INPUT_FILE: "env/not-found.yml", INPUT_A: "foo.bar", INPUT_B: "provider.stage", NOT_INPUT_C: "c" };
    await main();
    expect(core.setFailed).toHaveBeenCalled();
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
});
