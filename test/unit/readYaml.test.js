// @flow

import readYaml from "../../src/readYaml";

describe("readYaml", () => {
  it("reads a yaml file", () =>
    expect(readYaml("env/test.yml")).resolves.toMatchInlineSnapshot(`
      Object {
        "foo": Object {
          "bar": "baz",
        },
        "provider": Object {
          "stage": "green",
        },
        "qux": Array [
          Object {
            "bar": "hello",
          },
          Object {
            "bar": "world",
          },
        ],
      }
    `));

  it("reads a CloudFormation yaml file", () =>
    expect(readYaml("env/cfn.yml")).resolves.toMatchObject({
      // eslint-disable-next-line no-template-curly-in-string
      Resources: { CloudFormationServiceRole: { Properties: { RoleName: { "Fn::Sub": "${Service}CloudFormation" } } } }
    }));
});
