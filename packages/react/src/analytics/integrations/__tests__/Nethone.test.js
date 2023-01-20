import { Nethone } from '../';
import { utils } from '@farfetch/blackout-core/analytics';

utils.logger.warn = jest.fn();
const mockLoggerWarn = utils.logger.warn;

describe('Nethone integration', () => {
  it('Should return an instance of it in .createInstance()', () => {
    Nethone.createInstance();

    expect(mockLoggerWarn).toHaveBeenCalledWith(
      '[Analytics] Nethone - This integration is not supported. Consider remove the usage of Nethone, because it will not trigger any inner event.',
    );
  });
});
