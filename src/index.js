// @flow

export type Export = {| Name: string, Value: string |};

export type ExportsPage = {| Exports: Export[], NextToken: ?string |};

export type ListExportsParams = { NextToken: ?string };
export type ListExportsResult = { promise: () => Promise<ExportsPage> };
export type CloudFormation = { listExports: ListExportsParams => ListExportsResult };

async function* flatten<T>(asyncIterator: AsyncIterator<T[]>): AsyncIterator<T> {
  for await (const items of asyncIterator) {
    // $FlowFixMe See https://github.com/facebook/flow/issues/5491
    yield* items;
  }
}

/**
 * Client to get the Site Names defined in a region.
 */
export default class SitesClient {
  /**
   * Get a page of CloudFormation Exports, memoized.
   */
  listExports: (?string) => Promise<ExportsPage>;

  /**
   * Construct the client to get Site Names.
   *
   * @param cloudFormation
   */
  constructor(cloudFormation: CloudFormation) {
    this.listExports = (NextToken: ?string) => cloudFormation.listExports({ NextToken }).promise();
  }

  /**
   * Lazily get the site names using an async iterator.
   *
   * @returns {AsyncIterableIterator<string>}
   */
  async *generateNames(): AsyncIterator<string> {
    for await (const { Name, Value } of this.generateExports()) {
      if (Name.startsWith("StsSiteName-")) yield Value;
    }
  }

  /**
   * Get a promise for the array of site names.
   *
   * @returns {Promise<string[]>}
   */
  async getNames() {
    const result = [];
    for await (const name of this.generateNames()) {
      result.push(name);
    }
    return result;
  }

  /**
   * Async generator to lazily get the CloudFormation exports
   *
   * @param token
   * @returns {AsyncIterator<Export>}
   */
  async *generateExports(): AsyncIterator<Export> {
    yield* flatten(this.generateExportPages());
  }

  /**
   * Async generator for pages of CloudFormation Exports
   *
   * @param token
   * @returns {AsyncIterator<ExportsPage>>}
   */
  async *generateExportPages(token: ?string = null): AsyncIterator<Export[]> {
    const { Exports, NextToken }: ExportsPage = await this.listExports(token);
    yield Exports;
    if (NextToken != null) yield* this.generateExportPages(NextToken);
  }
}
