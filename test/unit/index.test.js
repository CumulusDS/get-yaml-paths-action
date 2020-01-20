// @flow

import SitesClient from "../../src";

function mockCloudFormation() {
  const listExports = jest
    .fn()
    .mockReturnValueOnce({
      promise: jest.fn().mockResolvedValue({
        Exports: [{ Name: "foo", Value: "bar" }],
        NextToken: "token"
      })
    })
    .mockReturnValueOnce({
      promise: jest.fn().mockResolvedValue({
        Exports: [
          {
            Name: "StsSiteName-neverland-test",
            Value: "neverland-test"
          }
        ],
        NextToken: null
      })
    });
  return { listExports };
}

describe("Sites Client", () => {
  it("includes neverland-test", () => {
    const sitesClient = new SitesClient(mockCloudFormation());
    return expect(sitesClient.getNames()).resolves.toEqual(expect.arrayContaining(["neverland-test"]));
  });

  it("loads pages", async () => {
    const cloudFormation = mockCloudFormation();
    const sitesClient = new SitesClient(cloudFormation);
    await sitesClient.getNames();
    expect(cloudFormation.listExports.mock.calls.length).toBe(2);
  });
});
