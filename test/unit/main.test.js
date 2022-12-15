// @flow

import * as core from "@actions/core";
import main from "../../src/main";

jest.mock("process");
jest.mock("@actions/core");

describe("main", () => {
  const OLD_ENV = process.env;

  it("calls setOutput when successful", async () => {
    process.env = {
      INPUT_FILE: "env/test.yml",
      INPUT_A: "foo.bar",
      INPUT_B: "provider.stage",
      NOT_INPUT_C: "c",
      INPUT_D: "qux[].bar",
      INPUT_E: "foo"
    };
    await main();
    expect(core.setOutput).toHaveBeenCalledWith("a", "baz");
    expect(core.setOutput).toHaveBeenCalledWith("b", "green");
    expect(core.setOutput).toHaveBeenCalledWith("d", '["hello","world"]');
    expect(core.setOutput).toHaveBeenCalledWith("e", '{"bar":"baz"}');
  });

  it("calls setFailed when unsuccessful", async () => {
    // $FlowFixMe
    process.exit = jest.fn();
    process.env = { INPUT_FILE: "env/not-found.yml", INPUT_A: "foo.bar", INPUT_B: "provider.stage", NOT_INPUT_C: "c" };
    await main();
    expect(core.setFailed).toHaveBeenCalledWith("ENOENT: no such file or directory, open 'env/not-found.yml'");
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
});
