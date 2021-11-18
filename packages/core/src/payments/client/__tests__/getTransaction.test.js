import { getTransaction } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getTransaction.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getTransaction', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/transactions/${id}`;

    it('should handle a client request successfully', async () => {
      const response = {};
      fixtures.success({ id, response });

      expect.assertions(2);
      await expect(getTransaction(id)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure({ id });

      expect.assertions(2);
      await expect(getTransaction(id)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
