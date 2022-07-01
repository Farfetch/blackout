import { postUserImpersonation } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postUserImpersonation.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postUserImpersonation', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;
  const data = {
    impersonatorUserName: 'pepe@acme.com',
    impersonatorPassword: '123465',
    impersonateeUserName: 'ateles@acme.com',
  };
  const response = {
    accessToken: '60f9ff83-d723-4c5a-8268-00cee557083b',
    expiresIn: '3600',
    refreshToken: '',
  };

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(postUserImpersonation(data)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      '/authentication/v1/userImpersonations',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(postUserImpersonation(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/authentication/v1/userImpersonations',
      data,
      expectedConfig,
    );
  });
});
