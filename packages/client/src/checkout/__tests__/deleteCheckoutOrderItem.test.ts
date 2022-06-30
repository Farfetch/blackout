import { checkoutOrderId, itemId } from 'tests/__fixtures__/checkout';
import { deleteCheckoutOrderItem } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteCheckoutOrderItem.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteCheckoutOrderItem', () => {
    const expectedUrl = `/checkout/v1/orders/${checkoutOrderId}/items/${itemId}`;
    const expectedConfig = undefined;
    const getSpy = jest.spyOn(client, 'delete');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success());

      await expect(
        deleteCheckoutOrderItem(checkoutOrderId, itemId),
      ).resolves.toEqual(200);
      expect(getSpy).toBeCalledWith(expectedUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);
      await expect(
        deleteCheckoutOrderItem(checkoutOrderId, itemId),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });
  });
});
