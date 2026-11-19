// flow-typed signature: hand-written
// flow-typed version: <<STUB>>/vitest_vx.x.x/flow_v0.142.0

/**
 * Minimal libdef for the subset of the vitest API used in this project.
 */
declare module "vitest" {
  declare type TestFn = () => void | Promise<mixed>;
  declare type HookFn = () => mixed;

  declare type MockFn = {
    (...args: $ReadOnlyArray<any>): any,
    mockImplementation(fn: (...args: $ReadOnlyArray<any>) => any): MockFn,
    mockReturnValue(value: any): MockFn,
    mockResolvedValue(value: any): MockFn,
    mockRejectedValue(value: any): MockFn,
    mockClear(): MockFn,
    mockReset(): MockFn,
    mockRestore(): void,
    mock: {
      calls: Array<Array<any>>,
      results: Array<{ type: string, value: any }>,
      ...
    },
    ...
  };

  declare export function describe(name: string, fn: () => void): void;
  declare export function it(name: string, fn?: TestFn, timeout?: number): void;
  declare export function test(name: string, fn?: TestFn, timeout?: number): void;
  declare export function beforeAll(fn: HookFn, timeout?: number): void;
  declare export function afterAll(fn: HookFn, timeout?: number): void;
  declare export function beforeEach(fn: HookFn, timeout?: number): void;
  declare export function afterEach(fn: HookFn, timeout?: number): void;
  declare export var expect: any;

  declare export var vi: {
    fn(implementation?: (...args: $ReadOnlyArray<any>) => any): MockFn,
    spyOn(object: { ... }, method: string): MockFn,
    mock(path: string, factory?: () => mixed): void,
    clearAllMocks(): typeof vi,
    resetAllMocks(): typeof vi,
    restoreAllMocks(): typeof vi,
    ...
  };
}
