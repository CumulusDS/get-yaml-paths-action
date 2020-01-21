// @flow

import { promises } from "fs";
import yaml from "js-yaml";

export default async function readYaml(filename: string) {
  const contents = await promises.readFile(filename, "utf8");
  return yaml.safeLoad(contents, { filename });
}
