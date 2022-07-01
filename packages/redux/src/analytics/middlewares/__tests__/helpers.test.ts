import { getCurrency } from '../helpers';
import { utils } from '@farfetch/blackout-analytics';

jest.mock('@farfetch/blackout-analytics', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-analytics'),
    utils: { logger: { error: jest.fn() } },
  };
});

it("'getCurrency' should throw an error if no currency is set in analyticsInstance", async () => {
  const fakeAnalyticsInstance = {
    context() {
      return null;
    },
  };

  // @ts-expect-error
  await getCurrency(fakeAnalyticsInstance);

  expect(utils.logger.error).toHaveBeenCalledWith(
    'Track event failed. Make sure to set `currencyCode` via `analytics.useContext()`.',
  );
});
