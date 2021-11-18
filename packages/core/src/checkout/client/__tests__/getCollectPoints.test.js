import * as checkoutClient from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getCollectPoints.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getCollectPoints', () => {
    const spy = jest.spyOn(client, 'get');
    const query = { checkoutId: id };
    const urlToBeCalled = `/checkout/v1/collectpoints?checkoutId=${query.checkoutId}`;

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.success({ response, query });

      expect.assertions(2);
      await expect(checkoutClient.getCollectPoints(query)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ query });

      await expect(
        checkoutClient.getCollectPoints(query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
