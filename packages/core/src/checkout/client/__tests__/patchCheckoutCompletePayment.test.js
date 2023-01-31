import * as checkoutClient from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/patchCheckoutCompletePayment.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('patchCheckoutCompletePayment', () => {
    const data = {};
    const spy = jest.spyOn(client, 'patch');

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.success({ id, response });

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
