import {
  checkoutOrderId,
  mockGetCheckoutOrderContextResponse,
} from 'tests/__fixtures__/checkout/index.mjs';
import { postCheckoutOrderContext } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postCheckoutOrderContext.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { AxiosResponse } from 'axios';
import type {
  CheckoutOrderContext,
  PostCheckoutOrderContextData,
} from '../types/index.js';

describe('checkout client', () => {
  const data: PostCheckoutOrderContextData = {
    context: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    value: 'foo',
  };
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('postCheckoutOrderContext', () => {
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = `/checkout/v1/orders/${checkoutOrderId}/contexts`;

    it('should handle a client request successfully', async () => {
      const response = {
        data: mockGetCheckoutOrderContextResponse,
      } as unknown as AxiosResponse<CheckoutOrderContext>;

      mswServer.use(fixtures.success(response));

      await expect(
        postCheckoutOrderContext(checkoutOrderId, data),
      ).resolves.toMatchObject(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        postCheckoutOrderContext(checkoutOrderId, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
