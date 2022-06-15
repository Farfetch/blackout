import { deleteCheckoutOrderItem } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/deleteCheckoutOrderItem.fixture';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteCheckoutOrderItem', () => {
    const checkoutOrderId = 123456;
    const itemId = 987654321;
    const expectedUrl = `/checkout/v1/orders/${checkoutOrderId}/items/${itemId}`;
    const expectedConfig = undefined;
    const getSpy = jest.spyOn(client, 'delete');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixture.success());

      await expect(
        deleteCheckoutOrderItem(checkoutOrderId, itemId),
      ).resolves.toEqual(200);
      expect(getSpy).toBeCalledWith(expectedUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixture.failure());

      expect.assertions(2);
      await expect(
        deleteCheckoutOrderItem(checkoutOrderId, itemId),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });
  });
});
