import getAllInputs from "./getAllInputs";

export default function getInput(): { file: string; paths: Record<string, string> } {
  const { file, ...paths } = getAllInputs();

  if (file == null) {
    throw new Error("The 'file' input is required.");
  }

  return { file, paths };
}
