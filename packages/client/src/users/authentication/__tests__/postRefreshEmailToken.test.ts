import { postRefreshEmailToken } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postRefreshEmailToken.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postRefreshEmailToken', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  const data = {
    username: 'test@test.com',
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);
    await expect(postRefreshEmailToken(data)).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/emailtokens',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(postRefreshEmailToken(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/emailtokens',
      data,
      expectedConfig,
    );
  });
});
