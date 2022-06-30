import { checkoutOrderId, itemId } from 'tests/__fixtures__/checkout';
import { patchCheckoutOrderItem } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchCheckoutOrderItem.fixtures';
import mswServer from '../../../tests/mswServer';

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
      ).resolves.toEqual(200);
      expect(getSpy).toBeCalledWith(expectedUrl, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);
      await expect(
        patchCheckoutOrderItem(checkoutOrderId, itemId, data),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, data, expectedConfig);
    });
  });
});
