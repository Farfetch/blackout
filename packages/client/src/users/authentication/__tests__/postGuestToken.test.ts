import { postGuestToken } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postGuestTokens.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postGuestToken', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');
  const endpoint = '/authentication/v1/guestTokens';

  beforeEach(() => jest.clearAllMocks());

  describe('Create a valid guest user token', () => {
    const data = {
      guestUserId: 0,
      guestUserEmail: 'guest@email.com',
      guestUserSecret: 'A1B2C3',
    };

    const response = {
      accessToken: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      expiresIn: '2021-01-22T16:46:11.481Z',
    };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(postGuestToken(data)).resolves.toStrictEqual(response);

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(postGuestToken(data)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });
  });
});
