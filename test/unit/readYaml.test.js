// @flow

import { describe, expect, it } from "vitest";
import readYaml from "../../src/readYaml";

describe("readYaml", () => {
  it("reads a yaml file", () =>
    expect(readYaml("env/test.yml")).resolves.toMatchInlineSnapshot(`
      {
        "foo": {
          "bar": "baz",
        },
        "foo-bar": 7,
        "provider": {
          "stage": "green",
        },
        "qux": [
          {
            "bar": "hello",
          },
          {
            "bar": "world",
          },
        ],
      }
    `));

  it("reads a CloudFormation yaml file", () =>
    expect(readYaml("env/cfn.yml")).resolves.toMatchObject({
      // eslint-disable-next-line no-template-curly-in-string
      Resources: { CloudFormationServiceRole: { Properties: { RoleName: { "Fn::Sub": "${Service}CloudFormation" } } } },
    }));

  it("rejects an absolute path", () =>
    expect(readYaml("/etc/passwd")).rejects.toThrow("must be a relative path within the workspace"));

  it("rejects a path that traverses out of the workspace", () =>
    expect(readYaml("../../etc/passwd")).rejects.toThrow("must be a relative path within the workspace"));

  it("rejects a traversal hidden behind a leading directory", () =>
    expect(readYaml("env/../../secret.yml")).rejects.toThrow("must be a relative path within the workspace"));
});
