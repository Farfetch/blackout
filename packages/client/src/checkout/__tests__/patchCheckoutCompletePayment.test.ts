import * as checkoutClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchCheckoutCompletePayment.fixtures';
import mswServer from '../../../tests/mswServer';
import type { PatchCheckoutCompletePaymentData } from '../types';

describe('checkout client', () => {
  const id = '123456';
  const data: PatchCheckoutCompletePaymentData = {
    confirmationParameters: {
      k: 'x',
    },
  };
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('patchCheckoutCompletePayment', () => {
    const spy = jest.spyOn(client, 'patch');

    it('should handle a client request successfully', async () => {
      const response = {};

      mswServer.use(fixtures.success(response));

      expect.assertions(2);

      await expect(
        checkoutClient.patchCheckoutCompletePayment(id, data),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(
        `/payment/v1/payments/${id}`,
        data,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        checkoutClient.patchCheckoutCompletePayment(id, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/payment/v1/payments/${id}`,
        data,
        expectedConfig,
      );
    });
  });
});
