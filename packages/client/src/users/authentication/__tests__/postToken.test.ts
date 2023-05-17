import { postToken } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postTokens.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postToken', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');
  const endpoint = '/authentication/v1/tokens';

  beforeEach(() => jest.clearAllMocks());

  describe('Create a valid user token', () => {
    const data = {
      username: 'myusername',
      password: 'password00',
      grantType: 'password',
      refreshToken:
        'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
    };

    const response = {
      accessToken: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      expiresIn: '2021-01-22T16:46:11.481Z',
      refreshToken:
        'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
    };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(postToken(data)).resolves.toStrictEqual(response);

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(postToken(data)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });
  });
});
