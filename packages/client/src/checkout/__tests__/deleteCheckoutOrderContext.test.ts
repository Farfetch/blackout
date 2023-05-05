import {
  checkoutOrderId,
  contextId,
} from 'tests/__fixtures__/checkout/index.mjs';
import { deleteCheckoutOrderContext } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteCheckoutOrderContext.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('checkout client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteCheckoutOrderContext', () => {
    const expectedUrl = `/checkout/v1/orders/${checkoutOrderId}/contexts/${contextId}`;
    const expectedConfig = undefined;
    const getSpy = jest.spyOn(client, 'delete');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success());

      await expect(
        deleteCheckoutOrderContext(checkoutOrderId, contextId),
      ).resolves.toStrictEqual({
        '@controls': null,
      });
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        deleteCheckoutOrderContext(checkoutOrderId, contextId),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });
  });
});
