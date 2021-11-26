/* eslint-disable no-console */

/**
 * @class Logger - Outputs objects with a prefix on the console
 */
class Logger {
  prefix: string;

  constructor(prefix = 'Logger') {
    this.prefix = prefix;
  }

  /**
   * Formats objects with the prefix.
   *
   * @param {*} args - Parameters to be outputed on the console.
   *
   * @returns {Array} - Array with the prefix, along with the rest of the arguments to be outputed.
   *
   * @memberof Logger
   */
  format(args: any[]): any[] {
    return [`${this.prefix}: `, ...args];
  }

  /**
   * Logs objects with console.log.
   *
   * @param {*} args - Items to be outputed on the console.
   * This parameter needs to be spreaded so we can send multiple arguments to the console.
   *
   * @memberof Logger
   */
  log(...args: any[]): void {
    console.log(...this.format(args));
  }

  /**
   * Logs objects with console.info.
   *
   * @param {*} args - Items to be outputed on the console.
   * This parameter needs to be spreaded so we can send multiple arguments to the console.
   *
   * @memberof Logger
   */
  info(...args: any[]): void {
    console.info(...this.format(args));
  }

  /**
   * Logs objects with console.warn.
   *
   * @param {*} args - Items to be outputed on the console.
   * This parameter needs to be spreaded so we can send multiple arguments to the console.
   *
   * @memberof Logger
   */
  warn(...args: any[]): void {
    console.warn(...this.format(args));
  }

  /**
   * Logs objects with console.error.
   *
   * @param {*} args - Items to be outputed on the console.
   * This parameter needs to be spreaded so we can send multiple arguments to the console.
   *
   * @memberof Logger
   */
  error(...args: any[]) {
    console.error(...this.format(args));
  }
}

export default Logger;
