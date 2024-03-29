import { postLogout } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postLogout.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postLogout', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

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

    await expect(postLogout()).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/logout',
      {},
      expectedConfig,
    );
  });
});
