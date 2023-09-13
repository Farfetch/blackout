import client from '../../helpers/client/index.js';

import putCheckoutSessionPromocodes from '../putCheckoutSessionPromocodes.js';

import mswServer from '../../../tests/mswServer.js';

import { mockCheckoutSessionId } from 'tests/__fixtures__/checkout/checkoutSessions.fixtures.mjs';
import fixtures from '../__fixtures__/putCheckoutSessionPromocodes.fixtures.js';

import type { PutCheckoutSessionPromocodesData } from '../types/index.js';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('putCheckoutSessionPromocodes', () => {
    const data: PutCheckoutSessionPromocodesData = {
      promocode: 'test_promocodes',
    };

    const spy = jest.spyOn(client, 'put');
    const urlToBeCalled = `/checkout/v1/checkoutSessions/${mockCheckoutSessionId}/promocodes`;

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success());

      await expect(
        putCheckoutSessionPromocodes(mockCheckoutSessionId, data),
      ).resolves.toBe(204);

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        putCheckoutSessionPromocodes(mockCheckoutSessionId, data),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
