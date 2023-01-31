import * as checkoutClient from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/postCharges.fixtures.js';
import moxios from 'moxios';
describe('checkout client', () => {
  const id = '123456';
  const expectedConfig = undefined;
  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });
  afterEach(() => moxios.uninstall(client));
  describe('postCharges', () => {
    const data = {};
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = `/checkout/v1/orders/${id}/charges`;
    it('should handle a client request successfully', async () => {
      const response = {};
      fixture.success({ id, response });
      expect.assertions(2);
      await expect(checkoutClient.postCharges(id, data)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
    it('should receive a client request error', async () => {
      fixture.failure({ id });
      expect.assertions(2);
      await expect(
        checkoutClient.postCharges(id, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
