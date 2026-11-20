import { afterAll, describe, expect, it, vi } from "vitest";
import { promises } from "fs";
import * as core from "@actions/core";
import main from "../../src/main";

vi.mock("@actions/core");

describe("main", () => {
  const OLD_ENV = process.env;

  it("calls setOutput when successful", async () => {
    process.env = {
      INPUT_FILE: "env/test.yml",
      INPUT_A: "foo.bar",
      INPUT_B: "provider.stage",
      NOT_INPUT_C: "c",
      INPUT_D: "qux[].bar",
      INPUT_E: "foo",
      INPUT_F: '"foo-bar"',
    };
    await main();
    expect(core.setOutput).toHaveBeenCalledWith("a", "baz");
    expect(core.setOutput).toHaveBeenCalledWith("b", "green");
    expect(core.setOutput).toHaveBeenCalledWith("d", '["hello","world"]');
    expect(core.setOutput).toHaveBeenCalledWith("e", '{"bar":"baz"}');
    expect(core.setOutput).toHaveBeenCalledWith("f", 7);
  });

  it("calls setFailed when unsuccessful", async () => {
    const exit = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
    process.env = { INPUT_FILE: "env/not-found.yml", INPUT_A: "foo.bar", INPUT_B: "provider.stage", NOT_INPUT_C: "c" };
    await main();
    expect(core.setFailed).toHaveBeenCalledWith("ENOENT: no such file or directory, open 'env/not-found.yml'");
    expect(exit).toHaveBeenCalledWith(1);
  });

  it("calls setFailed with a stringified value when a non-Error is thrown", async () => {
    const exit = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
    vi.spyOn(promises, "readFile").mockRejectedValueOnce("not an error");
    process.env = { INPUT_FILE: "env/test.yml", INPUT_A: "foo.bar" };
    await main();
    expect(core.setFailed).toHaveBeenCalledWith("not an error");
    expect(exit).toHaveBeenCalledWith(1);
  });

  afterAll(() => {
    process.env = OLD_ENV;
    vi.restoreAllMocks();
  });
});
