import * as checkoutClient from '../index.js';
import { mockCheckoutSession } from 'tests/__fixtures__/checkout/checkoutSessions.fixtures.mjs';
import { type PostCheckoutSessionDataWithItems } from '../types/index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postCheckoutSession.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('checkout client', () => {
  const data: PostCheckoutSessionDataWithItems = {
    items: [
      {
        productId: 1,
        quantity: 1,
        variantId: '10a0c23a-a1b2-4738-95b0-feeaa70465ee',
        merchantId: 1,
      },
    ],
    email: 'test-email@acme.com',
    metadata: {
      someKey: 'someValue',
      anotherKey: 'anotherValue',
    },
    successUrl: 'www.test.com/success',
    cancelUrl: 'www.test.com/cancel',
  };
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('postCheckoutSession', () => {
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = '/checkout/v1/checkoutSessions';

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockCheckoutSession));

      await expect(
        checkoutClient.postCheckoutSession(data),
      ).resolves.toStrictEqual(mockCheckoutSession);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.postCheckoutSession(data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
