import { postUserToken } from '../';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/postUserToken.fixtures';
import moxios from 'moxios';

describe('postUserToken', () => {
  const endpoint = '/authentication/v1/userTokens';
  const expectedConfig = {
    baseURL: 'https://management.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('Create a valid token with an authorized client', () => {
    const data = {
      grantType: 'password',
      username: 'user1',
      password: 'pass123',
    };

    const response = {
      accessToken: '04b55bb7-f1af-4b45-aa10-5c4667a48936',
      expiresIn: '1200',
      refreshToken:
        'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
    };

    it('should handle a client request successfully', async () => {
      fixtures.success({ response });

      expect.assertions(2);

      await expect(postUserToken(data)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure();

      expect.assertions(2);

      await expect(postUserToken(data)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });
  });

  describe('Create a valid token for guest user', () => {
    const data = {
      grantType: 'client_credentials',
      guestUserId: '2187374',
    };

    const response = {
      accessToken: '04b55bb7-f1af-4b45-aa10-5c4667a48936',
      expiresIn: '1200',
      refreshToken:
        'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
    };

    it('should handle a client request successfully', async () => {
      fixtures.success({ response });

      expect.assertions(2);

      await expect(postUserToken(data)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure();

      expect.assertions(2);

      await expect(postUserToken(data)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });
  });

  describe('Refresh an authorized client token', () => {
    const data = {
      grantType: 'refresh_token',
      refreshToken: '34659346789574387598hujgbfjhbgjhdfbghjb',
    };

    const response = {
      accessToken: '04b55bb7-f1af-4b45-aa10-5c4667a48936',
      expiresIn: '1200',
      refreshToken:
        'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
    };

    it('should handle a client request successfully', async () => {
      fixtures.success({ response });

      expect.assertions(2);

      await expect(postUserToken(data)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure();

      expect.assertions(2);

      await expect(postUserToken(data)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });
  });
});
