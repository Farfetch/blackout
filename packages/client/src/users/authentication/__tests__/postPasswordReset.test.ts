import { postPasswordReset } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postPasswordReset.fixtures';
import mswServer from '../../../../tests/mswServer';

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

    expect.assertions(2);
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

    expect.assertions(2);
    await expect(postPasswordReset(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/passwordreset',
      data,
      expectedConfig,
    );
  });
});
