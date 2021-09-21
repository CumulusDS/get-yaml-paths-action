// @flow

export default function getAllInputs(): { [string]: string } {
  // $FlowFixMe[incompatible-return]
  return Object.entries(process.env)
    .filter(([key]) => /^INPUT_/.test(key))
    .reduce((result, [key, value]) => {
      const inputName = key.substr("INPUT_".length).toLowerCase();
      return { ...result, [inputName]: value };
    }, {});
}
