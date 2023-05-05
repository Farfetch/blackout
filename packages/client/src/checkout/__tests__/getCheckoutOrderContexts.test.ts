import { checkoutOrderId } from 'tests/__fixtures__/checkout/index.mjs';
import { getCheckoutOrderContexts } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutOrderContexts.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { CheckoutOrderContext } from '../types/index.js';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutOrderContexts', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${checkoutOrderId}/contexts`;

    it('should handle a client request successfully', async () => {
      const response: CheckoutOrderContext[] = [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          context: 'string',
          value: 'string',
          createdAt: '2023-05-05T17:54:29.565Z',
        },
      ];

      mswServer.use(fixtures.success(response));

      await expect(
        getCheckoutOrderContexts(checkoutOrderId),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        getCheckoutOrderContexts(checkoutOrderId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
