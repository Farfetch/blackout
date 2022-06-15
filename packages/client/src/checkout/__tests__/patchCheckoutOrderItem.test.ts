import { patchCheckoutOrderItem } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/patchCheckoutOrderItem.fixture';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('patchCheckoutOrderItem', () => {
    const checkoutOrderId = 123456;
    const itemId = 987654321;
    const data = {
      quantity: 10,
    };
    const expectedUrl = `/checkout/v1/orders/${checkoutOrderId}/items/${itemId}`;
    const expectedConfig = undefined;
    const getSpy = jest.spyOn(client, 'patch');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixture.success());

      await expect(
        patchCheckoutOrderItem(checkoutOrderId, itemId, data),
      ).resolves.toEqual(200);
      expect(getSpy).toBeCalledWith(expectedUrl, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixture.failure());

      expect.assertions(2);
      await expect(
        patchCheckoutOrderItem(checkoutOrderId, itemId, data),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, data, expectedConfig);
    });
  });
});
