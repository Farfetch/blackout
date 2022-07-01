import { postLogin } from '..';
import { mockResponse as response } from '../__fixtures__/login.fixtures';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postLogin.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postLogin', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;
  const data = {
    username: 'pepe@acme.com',
    password: '123465',
    rememberMe: true,
  };

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(postLogin(data)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/login',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(postLogin(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/login',
      data,
      expectedConfig,
    );
  });
});
