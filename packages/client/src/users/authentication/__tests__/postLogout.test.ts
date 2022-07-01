import { postLogout } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postLogout.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postLogout', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);
    await expect(postLogout()).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/logout',
      {},
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(postLogout()).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/logout',
      {},
      expectedConfig,
    );
  });
});
