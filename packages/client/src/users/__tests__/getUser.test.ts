import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getUser.fixtures';
import moxios from 'moxios';

describe('getUser', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('Account Service', () => {
    const responseUrl = '/account/v1/users/me';

    it('should handle a client request successfully', async () => {
      const response = {};

      fixtures.success({ response });

      expect.assertions(2);

      await expect(usersClient.getUser()).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(responseUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure();

      expect.assertions(2);

      await expect(usersClient.getUser()).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(responseUrl, expectedConfig);
    });
  });
});
