export default function getAllInputs(): Record<string, string> {
  return Object.entries(process.env)
    .filter((entry): entry is [string, string] => /^INPUT_/.test(entry[0]) && entry[1] !== undefined)
    .reduce<Record<string, string>>((result, [key, value]) => {
      const inputName = key.substring("INPUT_".length).toLowerCase();
      return { ...result, [inputName]: value };
    }, {});
}
