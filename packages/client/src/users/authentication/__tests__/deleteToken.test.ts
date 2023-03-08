import { deleteToken } from '../index.js';
import { id } from 'tests/__fixtures__/authentication/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteTokens.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('deleteToken', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const endpoint = '/authentication/v1/tokens';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(deleteToken(id)).resolves.toBe(204);

    expect(spy).toHaveBeenCalledWith(`${endpoint}/${id}`, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(deleteToken(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(`${endpoint}/${id}`, expectedConfig);
  });
});
