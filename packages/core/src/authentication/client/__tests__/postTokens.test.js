import { postTokens } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postTokens.fixtures';
import moxios from 'moxios';

describe('postTokens', () => {
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'post');
  const endpoint = '/authentication/v1/tokens';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('Create a valid guest user token', () => {
    const data = {
      username: 'myusername',
      password: 'password00',
      grantType: 'password',
    };

    const response = {
      accessToken: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      expiresIn: '2021-01-22T16:46:11.481Z',
      refreshToken:
        'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
    };

    it('should handle a client request successfully', async () => {
      fixtures.success({ response });

      expect.assertions(2);

      await expect(postTokens(data)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure();

      expect.assertions(2);

      await expect(postTokens(data)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });
  });
});
