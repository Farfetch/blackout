import * as checkoutClient from '../index.js';
import {
  mockCheckoutSession,
  mockCheckoutSessionId,
} from 'tests/__fixtures__/checkout/checkoutSessions.fixtures.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutSession.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('checkout client', () => {
  const expectedConfig = {
    headers: {
      'x-my-header': 'x-my-value',
    },
  };

  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutSession', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/checkoutSessions/${mockCheckoutSessionId}`;

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockCheckoutSession));

      await expect(
        checkoutClient.getCheckoutSession(
          mockCheckoutSessionId,
          expectedConfig,
        ),
      ).resolves.toStrictEqual(mockCheckoutSession);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.getCheckoutSession(
          mockCheckoutSessionId,
          expectedConfig,
        ),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
