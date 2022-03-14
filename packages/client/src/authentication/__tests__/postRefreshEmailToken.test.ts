import { postRefreshEmailToken } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postRefreshEmailToken.fixtures';
import moxios from 'moxios';

describe('postRefreshEmailToken', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const data = {
    username: 'test@test.com',
  };

  it('should handle a client request successfully', async () => {
    fixtures.success();

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
    fixtures.failure();

    expect.assertions(2);
    await expect(postRefreshEmailToken(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/emailtokens',
      data,
      expectedConfig,
    );
  });
});
