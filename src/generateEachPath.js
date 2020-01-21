// @flow

import get from "lodash.get";

export default function* generateEachPath(
  document: {},
  paths: { [string]: string }
): Iterable<{ name: string, value: string }> {
  for (const name of Object.keys(paths)) {
    const path = paths[name];
    const value = get(document, path);
    yield { name, value };
  }
}
