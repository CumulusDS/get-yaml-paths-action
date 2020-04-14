// flow-typed signature: f71de6293107d39fa6850dafb76ef8e0
// flow-typed version: <<STUB>>/@actions/core_v^1.2.1/flow_v0.112.0

declare module '@actions/core' {
  /**
   * Interface for getInput options
   */
  declare export interface InputOptions {
    /**
     * Optional. Whether the input is required. If required and not present, will throw. Defaults to false
     */
    required?: boolean;
  }
  /**
   * The code to exit an action
   */

  declare export var ExitCode: {|
    +Success: 0, // 0
    +Failure: 1 // 1
  |};

  /**
   * Sets env variable for this action and future actions in the job
   * @param name the name of the variable to set
   * @param val the value of the variable
   */
  declare export function exportVariable(name: string, val: string): void;

  /**
   * Registers a secret which will get masked from logs
   * @param secret value of the secret
   */
  declare export function setSecret(secret: string): void;

  /**
   * Prepends inputPath to the PATH (for this action and future actions)
   * @param inputPath
   */
  declare export function addPath(inputPath: string): void;

  /**
   * Gets the value of an input.  The value is also trimmed.
   * @param name name of the input to get
   * @param options optional. See InputOptions.
   * @returns string
   */
  declare export function getInput(name: string, options?: InputOptions): string;

  /**
   * Sets the value of an output.
   * @param name name of the output to set
   * @param value value to store
   */
  declare export function setOutput(name: string, value: string): void;

  /**
   * Sets the action status to failed.
   * When the action exits it will be with an exit code of 1
   * @param message add error issue message
   */
  declare export function setFailed(message: string): void;

  /**
   * Writes debug message to user log
   * @param message debug message
   */
  declare export function debug(message: string): void;

  /**
   * Adds an error issue
   * @param message error issue message
   */
  declare export function error(message: string): void;

  /**
   * Adds an warning issue
   * @param message warning issue message
   */
  declare export function warning(message: string): void;

  /**
   * Writes info to log with console.log.
   * @param message info message
   */
  declare export function info(message: string): void;

  /**
   * Begin an output group.
   *
   * Output until the next `groupEnd` will be foldable in this group
   * @param name The name of the output group
   */
  declare export function startGroup(name: string): void;

  /**
   * End an output group.
   */
  declare export function endGroup(): void;

  /**
   * Wrap an asynchronous function call in a group.
   *
   * Returns the same type as the function itself.
   * @param name The name of the group
   * @param fn The function to wrap in the group
   */
  declare export function group<T>(
    name: string,
    fn: () => Promise<T>
  ): Promise<T>;

  /**
   * Saves state for current action, the state can only be retrieved by this action's post job execution.
   * @param name name of the state to store
   * @param value value to store
   */
  declare export function saveState(name: string, value: string): void;

  /**
   * Gets the value of an state set by this action's main execution.
   * @param name name of the state to get
   * @returns string
   */
  declare export function getState(name: string): string;
}
