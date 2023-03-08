import { postPasswordReset } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postPasswordReset.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postPasswordReset', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  const data = {
    username: 'pepe@acme.com',
    token: '1293819283sdfs23',
    password: 'thisIsUserPassword',
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(postPasswordReset(data)).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/passwordreset',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postPasswordReset(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/passwordreset',
      data,
      expectedConfig,
    );
  });
});
