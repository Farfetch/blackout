import { postLogin } from '../';
import { mockResponse as response } from '../__fixtures__/login.fixtures';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postLogin.fixtures';
import moxios from 'moxios';

describe('postLogin', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;
  const data = {
    userName: 'pepe@acme.com',
    password: '123465',
    rememberMe: true,
  };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({ response });

    expect.assertions(2);
    await expect(postLogin(data)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/login',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    expect.assertions(2);
    await expect(postLogin(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/login',
      data,
      expectedConfig,
    );
  });
});
