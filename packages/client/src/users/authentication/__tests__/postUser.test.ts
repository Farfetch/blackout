import { postUser } from '..';
import { mockResponse as response } from '../__fixtures__/login.fixtures';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postUser.fixtures';
import mswServer from '../../../../tests/mswServer';

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
    mswServer.use(fixtures.success(response));

    await expect(postUser(requestData)).resolves.toStrictEqual(response);
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
