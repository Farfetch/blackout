/* eslint-disable no-console */

import Logger from '../Logger';

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

    expect(console.log).toBeCalledWith(defaultPrefix, message);
  });

  it('Should log without passing a prefix', () => {
    const customPrefix = 'MyComponent';
    const message = 'foo';
    const _logger = new Logger(customPrefix);

    _logger.log(message);

    expect(console.log).toBeCalledWith(`${customPrefix}: `, message);
  });

  it('Should log more than one argument', () => {
    const message = 'foo';
    const message2 = 'bar';

    logger.log(message, message2);

    expect(console.log).toBeCalledWith(defaultPrefix, message, message2);
  });

  it('Should log a warn message', () => {
    const message = 'foo';

    logger.warn(message);

    expect(console.warn).toBeCalledWith(defaultPrefix, message);
  });

  it('Should log an info message', () => {
    const message = 'foo';

    logger.info(message);

    expect(console.info).toBeCalledWith(defaultPrefix, message);
  });

  it('Should log an error message', () => {
    const message = 'foo';

    logger.error(message);

    expect(console.info).toBeCalledWith(defaultPrefix, message);
  });
});
