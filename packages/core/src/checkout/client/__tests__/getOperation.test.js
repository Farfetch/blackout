import * as checkoutClient from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getOperation.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = '123456';
  const operationId = '6789';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getOperation', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${id}/operations/${operationId}`;

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.success({ id, operationId, response });

      expect.assertions(2);
      await expect(checkoutClient.getOperation(id, operationId)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, operationId });

      expect.assertions(2);
      await expect(
        checkoutClient.getOperation(id, operationId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
