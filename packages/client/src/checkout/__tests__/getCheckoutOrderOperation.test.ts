import * as checkoutClient from '../index.js';
import {
  operationId,
  checkoutOrderId as orderId,
} from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutOrderOperation.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { CheckoutOrderOperation } from '../types/index.js';

describe('checkout client', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutOrderOperation', () => {
    const expectedUrl = `/checkout/v1/orders/${orderId}/operations/${operationId}`;
    const expectedConfig = undefined;
    const getSpy = jest.spyOn(client, 'get');
    const response: CheckoutOrderOperation = {
      id: operationId,
      createdDate: '',
      changes: [],
      violations: [],
    };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(
        checkoutClient.getCheckoutOrderOperation(orderId, operationId),
      ).resolves.toEqual(response);
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.getCheckoutOrderOperation(orderId, operationId),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });
  });
});
