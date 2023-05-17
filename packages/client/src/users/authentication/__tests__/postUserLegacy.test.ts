import { mockResponse as response } from '../__fixtures__/login.fixtures.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postUserLegacy.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';
import postUserLegacy from '../postUserLegacy.js';

describe('postUserLegacy', () => {
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

    await expect(postUserLegacy(requestData)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/register',
      requestData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postUserLegacy(requestData)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/legacy/v1/account/register',
      requestData,
      expectedConfig,
    );
  });
});
