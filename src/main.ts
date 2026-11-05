import * as core from "@actions/core";
import getInput from "./getInput";
import readYaml from "./readYaml";
import generateEachPath from "./generateEachPath";

export default async function main() {
  try {
    const { file, paths } = getInput();
    const document = await readYaml(file) as Record<any, any>;

    for (const { name, value } of generateEachPath(document, paths)) {
      core.setOutput(name, value);
    }
  } catch (error: any) {
    console.log(error);
    core.setFailed(error.message);
    process.exit(1);
  }
}
