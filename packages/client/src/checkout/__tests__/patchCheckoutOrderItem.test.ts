import { checkoutOrderId, itemId } from 'tests/__fixtures__/checkout/index.mjs';
import { patchCheckoutOrderItem } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/patchCheckoutOrderItem.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('checkout client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('patchCheckoutOrderItem', () => {
    const data = {
      quantity: 10,
    };
    const expectedUrl = `/checkout/v1/orders/${checkoutOrderId}/items/${itemId}`;
    const expectedConfig = undefined;
    const getSpy = jest.spyOn(client, 'patch');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success());

      await expect(
        patchCheckoutOrderItem(checkoutOrderId, itemId, data),
      ).resolves.toBe(200);
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        patchCheckoutOrderItem(checkoutOrderId, itemId, data),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, data, expectedConfig);
    });
  });
});
