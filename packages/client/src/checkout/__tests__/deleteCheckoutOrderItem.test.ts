import {
  checkoutOrderId,
  itemId,
  operationId,
} from 'tests/__fixtures__/checkout/index.mjs';
import { deleteCheckoutOrderItem } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteCheckoutOrderItem.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

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
      ).resolves.toBe(200);
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });

    it('should handle a client request successfully with data', async () => {
      const response = {
        '@controls': {
          order_update_operation: {
            href: `/v1/orders/${checkoutOrderId}/operations/${operationId}`,
          },
        },
      };

      mswServer.use(fixtures.successWithData(response));

      await expect(
        deleteCheckoutOrderItem(checkoutOrderId, itemId),
      ).resolves.toStrictEqual(response);
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        deleteCheckoutOrderItem(checkoutOrderId, itemId),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });
  });
});
