import { postLogout } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postLogout.fixtures';
import moxios from 'moxios';

describe('postLogout', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success();

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
    fixtures.failure();

    expect.assertions(2);
    await expect(postLogout()).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/logout',
      {},
      expectedConfig,
    );
  });
});
