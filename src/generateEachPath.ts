import jmespath from "jmespath";

export default function* generateEachPath(
  document: unknown,
  paths: Record<string, string>,
): Generator<{ name: string; value: unknown }> {
  for (const name of Object.keys(paths)) {
    const query = paths[name];
    const result: unknown = jmespath.search(document, query);
    const value = typeof result === "object" ? JSON.stringify(result) : result;
    yield { name, value };
  }
}
