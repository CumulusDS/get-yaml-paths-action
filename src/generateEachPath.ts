import jmespath from "jmespath";

export default function* generateEachPath(
  document: Record<any, any>,
  paths: {
    [key: string]: string;
  },
): Iterable<{
  name: string;
  value: string;
}> {
  for (const name of Object.keys(paths)) {
    const query = paths[name] as string;
    const result = jmespath.search(document, query);
    const value = typeof result === "object" ? JSON.stringify(result) : result;
    yield { name, value };
  }
}
