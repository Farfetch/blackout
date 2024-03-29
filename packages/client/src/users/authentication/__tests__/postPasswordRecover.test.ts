import { postPasswordRecover } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postPasswordRecover.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postPasswordRecover', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  const data = {
    username: 'pepe@acme.com',
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(postPasswordRecover(data)).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/password/retrieve',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postPasswordRecover(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/password/retrieve',
      data,
      expectedConfig,
    );
  });
});
