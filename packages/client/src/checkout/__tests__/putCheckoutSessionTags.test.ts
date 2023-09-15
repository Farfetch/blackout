import client from '../../helpers/client/index.js';

import putCheckoutSessionTags from '../putCheckoutSessionTags.js';

import mswServer from '../../../tests/mswServer.js';

import { mockCheckoutSessionId } from 'tests/__fixtures__/checkout/checkoutSessions.fixtures.mjs';
import fixtures from '../__fixtures__/putCheckoutSessionTags.fixtures.js';

import type { CheckoutSessionTags } from '../types/index.js';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('putCheckoutSessionTags', () => {
    const data: CheckoutSessionTags = ['someTag'];

    const spy = jest.spyOn(client, 'put');
    const urlToBeCalled = `/checkout/v1/checkoutSessions/${mockCheckoutSessionId}/tags`;

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success());

      await expect(
        putCheckoutSessionTags(mockCheckoutSessionId, data),
      ).resolves.toBe(204);

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        putCheckoutSessionTags(mockCheckoutSessionId, data),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
