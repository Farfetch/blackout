import { mockUsersResponse } from 'tests/__fixtures__/users/users.fixtures.mjs';
import { postAccountLink } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postAccountLink.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postAccountLink', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  const requestData = {
    username: 'pepe@thefrog.com',
    password: '123qwe!',
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUsersResponse));

    await expect(postAccountLink(requestData)).resolves.toStrictEqual(
      mockUsersResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/oidc/accountlinking',
      requestData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postAccountLink(requestData)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/oidc/accountlinking',
      requestData,
      expectedConfig,
    );
  });
});
