import { mockUsersResponse } from 'tests/__fixtures__/users/users.fixtures.mjs';
import { postSocialLogin } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postSocialLogin.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postSocialLogin', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  const requestData = {
    provider: 'Google',
    socialAccessToken: 'xxx-xxx-xxx-xxx',
    rememberMe: true,
    countryCode: 'PT',
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUsersResponse));

    await expect(postSocialLogin(requestData)).resolves.toStrictEqual(
      mockUsersResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      '/account/oidc/login',
      requestData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postSocialLogin(requestData)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/oidc/login',
      requestData,
      expectedConfig,
    );
  });
});
