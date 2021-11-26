import * as checkoutClient from '..';
import { PatchCheckoutCompletePaymentData } from '../types';
import client from '../../helpers/client';
import fixture from '../__fixtures__/patchCheckoutCompletePayment.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = '123456';
  const data: PatchCheckoutCompletePaymentData = {
    confirmationParameters: {
      k: 'x',
    },
  };
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('patchCheckoutCompletePayment', () => {
    const spy = jest.spyOn(client, 'patch');

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.success({ id, data, response });

      expect.assertions(2);

      await expect(
        checkoutClient.patchCheckoutCompletePayment(id, data),
      ).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        `/payment/v1/payments/${id}`,
        data,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id });

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
