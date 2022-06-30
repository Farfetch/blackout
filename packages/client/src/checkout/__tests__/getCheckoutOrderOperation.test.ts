import * as checkoutClient from '..';
import {
  operationId,
  checkoutOrderId as orderId,
} from 'tests/__fixtures__/checkout';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCheckoutOrderOperation.fixtures';
import mswServer from '../../../tests/mswServer';
import type { CheckoutOrderOperation } from '../types';

describe('checkout client', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutOrderOperation', () => {
    const params = { orderId, operationId };
    const expectedUrl = `/checkout/v1/orders/${orderId}/operations/${operationId}`;
    const expectedConfig = undefined;
    const getSpy = jest.spyOn(client, 'get');
    const response: CheckoutOrderOperation = { id: operationId };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(
        checkoutClient.getCheckoutOrderOperation(params),
      ).resolves.toEqual(response);
      expect(getSpy).toBeCalledWith(expectedUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);
      await expect(
        checkoutClient.getCheckoutOrderOperation(params),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });
  });
});
