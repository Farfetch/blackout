import { mockUsersResponse } from 'tests/__fixtures__/users/users.fixtures.mjs';
import { postUser } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postUser.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postUser', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  const requestData = {
    countryCode: 'PT',
    email: 'pepe@acme.com',
    name: 'Pepe',
    password: 'pepe123',
    receiveNewsLetters: true,
    username: 'pepe@acme.com',
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUsersResponse));

    await expect(postUser(requestData)).resolves.toStrictEqual(
      mockUsersResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users',
      requestData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postUser(requestData)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users',
      requestData,
      expectedConfig,
    );
  });
});
