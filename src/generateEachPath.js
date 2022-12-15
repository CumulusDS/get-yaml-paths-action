// @flow

// $FlowFixMe[untyped-import]
import jmespath from "jmespath";

export default function* generateEachPath(
  document: {},
  paths: { [string]: string }
): Iterable<{ name: string, value: string }> {
  for (const name of Object.keys(paths)) {
    const query = paths[name];
    const result = jmespath.search(document, query);
    const value = typeof result === "object" ? JSON.stringify(result) : result;
    yield { name, value };
  }
}
