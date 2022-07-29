import { PACKAGE_NAME_VERSION } from './constants';

/* eslint-disable no-console */

let loggingPrefix = 'Logger';

/**
 * Outputs objects with a prefix on the console
 */
class Logger {
  constructor(prefix = 'Logger') {
    loggingPrefix = prefix;
  }

  /**
   * Formats objects with the prefix.
   *
   * @param args - Parameters to be outputted on the console.
   *
   * @returns Array with the prefix, along with the rest of the arguments to be outputted.
   */
  format(args: unknown[]): unknown[] {
    return [`${loggingPrefix}: `, ...args];
  }

  /**
   * Logs objects with console.log.
   *
   * @param args - Items to be outputted on the console. This parameter needs to be spread so we can send
   *               multiple arguments to the console.
   */
  log(...args: unknown[]): void {
    console.log(...this.format(args));
  }

  /**
   * Logs objects with console.info.
   *
   * @param args - Items to be outputted on the console. This parameter needs to be spread so we can send
   *               multiple arguments to the console.
   */
  info(...args: unknown[]): void {
    console.info(...this.format(args));
  }

  /**
   * Logs objects with console.warn.
   *
   * @param args - Items to be outputted on the console. This parameter needs to be spread so we can send
   *               multiple arguments to the console.
   */
  warn(...args: unknown[]): void {
    console.warn(...this.format(args));
  }

  /**
   * Logs objects with console.error.
   *
   * @param args - Items to be outputted on the console. This parameter needs to be spread so we can send
   *               multiple arguments to the console.
   */
  error(...args: unknown[]): void {
    console.error(...this.format(args));
  }
}

export { Logger };

export default new Logger(PACKAGE_NAME_VERSION);
