import { postUserImpersonation } from '../';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/postUserImpersonation.fixtures';
import moxios from 'moxios';

describe('postUserImpersonation', () => {
  const endpoint = '/authentication/v1/userImpersonations';
  const expectedConfig = {
    baseURL: 'https://management.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = {
    impersonatorUserName: 'pepe@acme.com',
    impersonatorPassword: '123465',
    impersonateeUserName: 'pepe@acme.com',
  };
  const response = {
    accessToken: '60f9ff83-d723-4c5a-8268-00cee557083b',
    expiresIn: '3600',
    refreshToken: '',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({ response });

    expect.assertions(2);
    await expect(postUserImpersonation(data)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    expect.assertions(2);
    await expect(postUserImpersonation(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
  });
});
