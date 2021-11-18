import { getCharges } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getCharges.fixtures.js';
import moxios from 'moxios';
describe('checkout client', () => {
  const id = '123456';
  const chargeId = '5c2855d7-f1c0-4d2a-8ce4-5bf7c37f0dc7';
  const expectedConfig = undefined;
  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });
  afterEach(() => moxios.uninstall(client));
  describe('getCharges', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${id}/charges/${chargeId}`;
    it('should handle a client request successfully', async () => {
      const response = {};
      fixture.success({ id, chargeId, response });
      expect.assertions(2);
      await expect(getCharges(id, chargeId)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
    it('should receive a client request error', async () => {
      fixture.failure({ id, chargeId });
      expect.assertions(2);
      await expect(getCharges(id, chargeId)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
