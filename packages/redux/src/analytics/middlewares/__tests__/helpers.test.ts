import { getCurrency } from '../helpers';
import { logger } from '@farfetch/blackout-analytics/utils';

jest.mock('@farfetch/blackout-analytics/utils', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-analytics/utils'),
    logger: { error: jest.fn() },
  };
});

it("'getCurrency' should throw an error if no currency is set in analyticsInstance", async () => {
  const fakeAnalyticsInstance = {
    context() {
      return null;
    },
  };

  await getCurrency(fakeAnalyticsInstance);

  expect(logger.error).toHaveBeenCalledWith(
    'Track event failed. Make sure to set `currencyCode` via `analytics.useContext()`.',
  );
});
