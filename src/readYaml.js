// @flow

import { promises } from "fs";
import yaml from "js-yaml";

const schema = yaml.Schema.create([
  new yaml.Type("!And", {
    kind: "sequence",
    construct(data) {
      return { "Fn::And": data };
    }
  }),
  new yaml.Type("!Base64", {
    kind: "mapping",
    construct(data) {
      return { "Fn::Base64": data };
    }
  }),
  new yaml.Type("!Cidr", {
    kind: "sequence",
    construct(data) {
      return { "Fn::Cidr": data };
    }
  }),
  new yaml.Type("!Condition", {
    kind: "scalar",
    construct(data) {
      return { Condition: data };
    }
  }),
  new yaml.Type("!Equals", {
    kind: "sequence",
    construct(data) {
      return { "Fn::Equals": data };
    }
  }),
  new yaml.Type("!FindInMap", {
    kind: "sequence",
    construct(data) {
      return { "Fn::FindInMap": data };
    }
  }),
  new yaml.Type("!GetAtt", {
    kind: "scalar",
    construct(data) {
      return { "Fn::GetAtt": data };
    }
  }),
  new yaml.Type("!GetAZs", {
    kind: "scalar",
    construct(data) {
      return { "Fn::GetAZs": data };
    }
  }),
  new yaml.Type("!If", {
    kind: "sequence",
    construct(data) {
      return { "Fn::If": data };
    }
  }),
  new yaml.Type("!ImportValue", {
    kind: "scalar",
    construct(data) {
      return { "Fn::ImportValue": data };
    }
  }),
  new yaml.Type("!Join", {
    kind: "sequence",
    construct(data) {
      return { "Fn::Join": data };
    }
  }),
  new yaml.Type("!Not", {
    kind: "sequence",
    construct(data) {
      return { "Fn::Not": data };
    }
  }),
  new yaml.Type("!Or", {
    kind: "sequence",
    construct(data) {
      return { "Fn::Or": data };
    }
  }),
  new yaml.Type("!Ref", {
    kind: "scalar",
    construct(data) {
      return { Ref: data };
    }
  }),
  new yaml.Type("!Select", {
    kind: "sequence",
    construct(data) {
      return { "Fn::Select": data };
    }
  }),
  new yaml.Type("!Split", {
    kind: "sequence",
    construct(data) {
      return { "Fn::Split": data };
    }
  }),
  new yaml.Type("!Sub", {
    kind: "scalar",
    construct(data) {
      return { "Fn::Sub": data };
    }
  })
]);

export default async function readYaml(filename: string): Promise<mixed> {
  const contents = await promises.readFile(filename, "utf8");
  return yaml.safeLoad(contents, { filename, schema });
}
