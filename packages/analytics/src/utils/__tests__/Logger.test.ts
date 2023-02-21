/* eslint-disable no-console */

import { Logger } from '../logger';

describe('Logger', () => {
  console.log = jest.fn();
  console.info = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();

  const defaultPrefix = 'Logger: ';
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger();
  });

  it('Should log without passing a prefix', () => {
    const message = 'foo';

    logger.log(message);

    expect(console.log).toHaveBeenCalledWith(defaultPrefix, message);
  });

  it('Should log with a custom prefix', () => {
    const customPrefix = 'MyComponent';
    const message = 'foo';
    const _logger = new Logger(customPrefix);

    _logger.log(message);

    expect(console.log).toHaveBeenCalledWith(`${customPrefix}: `, message);
  });

  it('Should log more than one argument', () => {
    const message = 'foo';
    const message2 = 'bar';

    logger.log(message, message2);

    expect(console.log).toHaveBeenCalledWith(defaultPrefix, message, message2);
  });

  it('Should log a warn message', () => {
    const message = 'foo';

    logger.warn(message);

    expect(console.warn).toHaveBeenCalledWith(defaultPrefix, message);
  });

  it('Should log an info message', () => {
    const message = 'foo';

    logger.info(message);

    expect(console.info).toHaveBeenCalledWith(defaultPrefix, message);
  });

  it('Should log an error message', () => {
    const message = 'foo';

    logger.error(message);

    expect(console.info).toHaveBeenCalledWith(defaultPrefix, message);
  });
});
