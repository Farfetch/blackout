import * as checkoutClient from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getOperations.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getOperations', () => {
    const spy = jest.spyOn(client, 'get');
    const query = { page: 1, pageSize: 180 };
    const urlToBeCalled = `/checkout/v1/orders/${id}/operations?page=${query.page}&pageSize=${query.pageSize}`;

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.success({ id, query, response });

      expect.assertions(2);
      await expect(checkoutClient.getOperations(id, query)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, query });

      expect.assertions(2);
      await expect(
        checkoutClient.getOperations(id, query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
