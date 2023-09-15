import { getCheckoutSessionTags } from '../index.js';
import { mockCheckoutSessionId } from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutSessionTags.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { CheckoutSessionTags } from '../types/index.js';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutSessionTags', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/checkoutSessions/${mockCheckoutSessionId}/tags`;

    it('should handle a client request successfully', async () => {
      const response: CheckoutSessionTags = ['tag1'];

      mswServer.use(fixtures.success(response));

      await expect(
        getCheckoutSessionTags(mockCheckoutSessionId),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        getCheckoutSessionTags(mockCheckoutSessionId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
