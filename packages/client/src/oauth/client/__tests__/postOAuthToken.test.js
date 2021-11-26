import { postOAuthToken } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postOAuthToken.fixtures';
import moxios from 'moxios';

describe('oauth client', () => {
  const mockData = {
    grant_type: 'client_credentials',
    client_id: 'client_id',
    client_secret: 'client_secret',
    scope: 'api',
  };
  const mockResponse = {
    access_token: 'NgCXRKc...MzYjw',
    token_type: 'bearer',
    expires_in: 3600,
  };
  const mockConfig = {
    baseURL: '/api-bw',
  };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('postOAuthToken()', () => {
    const spy = jest.spyOn(client, 'post');

    it('should handle a client request successfully', async () => {
      fixtures.success({
        response: mockResponse,
      });

      expect.assertions(2);

      await expect(postOAuthToken(mockData, mockConfig)).resolves.toBe(
        mockResponse,
      );

      expect(spy).toHaveBeenCalledWith(
        '/oauth/v1/connect/token',
        mockData,
        mockConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure();

      await expect(
        postOAuthToken(mockData, mockConfig),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/oauth/v1/connect/token',
        mockData,
        mockConfig,
      );
    });
  });
});
