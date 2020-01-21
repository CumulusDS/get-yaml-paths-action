// @flow

import getAllInputs from "./getAllInputs";

export default function getInput(): { file: string, paths: { [string]: string } } {
  // $FlowFixMe
  const { file, ...paths } = getAllInputs();

  if (file == null) {
    throw new Error("The 'file' input is required.");
  }

  return { file, paths };
}
