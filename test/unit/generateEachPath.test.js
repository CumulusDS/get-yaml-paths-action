// @flow

import generateEachPath from "../../src/generateEachPath";

describe("outputEachPath", () => {
  it("core.setOutput for each name and value", () => {
    expect(
      Array.from(
        generateEachPath(
          { foo: { bar: "baz" }, provider: { stage: "green" } },
          {
            bar: "foo.bar",
            stage: "provider.stage"
          }
        )
      )
    ).toEqual([
      { name: "bar", value: "baz" },
      { name: "stage", value: "green" }
    ]);
  });
});
