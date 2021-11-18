import { postTransaction } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postTransaction.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = '123456';
  const data = {};
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('postTransaction', () => {
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = `/checkout/v1/transactions/${id}/charges`;

    it('should handle a client request successfully', async () => {
      const response = {};

      fixtures.success({ id, response });

      expect.assertions(2);
      await expect(postTransaction(id, data)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure({ id });

      expect.assertions(2);
      await expect(postTransaction(id, data)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
