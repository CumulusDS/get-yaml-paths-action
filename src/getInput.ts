import getAllInputs from "./getAllInputs";

export default function getInput(): {
  file: string;
  paths: {
    [key: string]: string;
  };
} {
  const { file, ...paths } = getAllInputs();

  if (file == null) {
    throw new Error("The 'file' input is required.");
  }

  return { file, paths };
}
