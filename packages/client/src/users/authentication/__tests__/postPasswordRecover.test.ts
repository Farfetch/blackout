import { postPasswordRecover } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postPasswordRecover.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postPasswordRecover', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  const data = {
    username: 'pepe@acme.com',
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);
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

    expect.assertions(2);
    await expect(postPasswordRecover(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/password/retrieve',
      data,
      expectedConfig,
    );
  });
});
