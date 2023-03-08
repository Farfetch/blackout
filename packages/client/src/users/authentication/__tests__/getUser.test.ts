import * as usersClient from '../index.js';
import { mockUsersResponse } from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUser.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUser', () => {
  const expectedConfig = undefined;
  const responseUrl = '/account/v1/users/me';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUsersResponse));

    await expect(usersClient.getUser()).resolves.toStrictEqual(
      mockUsersResponse,
    );

    expect(spy).toHaveBeenCalledWith(responseUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(usersClient.getUser()).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(responseUrl, expectedConfig);
  });
});
