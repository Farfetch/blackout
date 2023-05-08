import { mockResponse as response } from '../__fixtures__/login.fixtures.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserLegacy.fixtures.js';
import getUserLegacy from '../getUserLegacy.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserLegacy', () => {
  const expectedConfig = undefined;
  const responseUrl = '/legacy/v1/users/me';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(getUserLegacy()).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(responseUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserLegacy()).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(responseUrl, expectedConfig);
  });
});
