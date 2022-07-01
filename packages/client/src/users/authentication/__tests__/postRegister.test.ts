import { postRegister } from '..';
import { mockResponse as response } from '../__fixtures__/login.fixtures';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postRegister.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postRegister', () => {
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

    expect.assertions(2);
    await expect(postRegister(requestData)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users',
      requestData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(postRegister(requestData)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users',
      requestData,
      expectedConfig,
    );
  });
});
