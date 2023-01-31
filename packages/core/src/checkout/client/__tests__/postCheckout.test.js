import * as checkoutClient from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/postCheckout.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('postCheckout', () => {
    const data = {};
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = '/checkout/v1/orders';

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.success({ response });

      expect.assertions(2);
      await expect(checkoutClient.postCheckout(data)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure();

      expect.assertions(2);
      await expect(checkoutClient.postCheckout(data)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
