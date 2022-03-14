import { postGuestTokens } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postGuestTokens.fixtures';
import moxios from 'moxios';

describe('postGuestTokens', () => {
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'post');
  const endpoint = '/authentication/v1/guestTokens';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

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
      fixtures.success({ response });

      expect.assertions(2);

      await expect(postGuestTokens(data)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure();

      expect.assertions(2);

      await expect(postGuestTokens(data)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(endpoint, data, expectedConfig);
    });
  });
});
