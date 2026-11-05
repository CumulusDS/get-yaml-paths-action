export default function getAllInputs(): {
  [key: string]: string;
} {
  return Object.entries(process.env)
    .filter(([key]: [any]) => /^INPUT_/.test(key))
    .reduce<Record<string, any>>((result, [key, value]: [any, any]) => {
      const inputName = key.substr("INPUT_".length).toLowerCase();
      return { ...result, [inputName]: value };
    }, {});
}
