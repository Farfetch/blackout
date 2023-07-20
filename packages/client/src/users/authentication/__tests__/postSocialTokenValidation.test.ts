import { mockUsersResponse } from 'tests/__fixtures__/users/users.fixtures.mjs';
import { postSocialTokenValidation } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postSocialTokenValidation.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postSocialTokenValidation', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  const requestData = {
    token: 'xxx-xxx-xxx-xxx',
    tokenTypeHint: '',
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUsersResponse));

    await expect(postSocialTokenValidation(requestData)).resolves.toStrictEqual(
      mockUsersResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      '/authentication/v1/connect/introspect',
      requestData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postSocialTokenValidation(requestData),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/authentication/v1/connect/introspect',
      requestData,
      expectedConfig,
    );
  });
});
