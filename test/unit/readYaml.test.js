// @flow

import readYaml from "../../src/readYaml";

describe("readYaml", () => {
  it("reads a yaml file", () =>
    expect(readYaml("env/test.yml")).resolves.toEqual({ foo: { bar: "baz" }, provider: { stage: "green" } }));
});
