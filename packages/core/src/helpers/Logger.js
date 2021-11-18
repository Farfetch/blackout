/* eslint-disable no-console */

/**
 * @class Logger - Outputs objects with a prefix on the console
 */
export default class Logger {
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
  format(args) {
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
  log(...args) {
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
  info(...args) {
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
  warn(...args) {
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
  error(...args) {
    console.error(...this.format(args));
  }
}
