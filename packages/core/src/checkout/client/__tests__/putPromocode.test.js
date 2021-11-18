import * as checkoutClient from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/putPromocode.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('putPromocode', () => {
    const data = {};
    const spy = jest.spyOn(client, 'put');
    const urlToBeCalled = `/checkout/v1/orders/${id}/promocodes`;

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.success({ id, response });

      expect.assertions(2);
      await expect(checkoutClient.putPromocode(id, data)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id });

      expect.assertions(2);
      await expect(
        checkoutClient.putPromocode(id, data),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
