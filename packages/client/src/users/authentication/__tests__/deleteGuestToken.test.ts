import { deleteGuestToken } from '../index.js';
import { id } from 'tests/__fixtures__/authentication/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteGuestToken.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('deleteGuestToken', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const endpoint = '/authentication/v1/guestTokens';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(deleteGuestToken(id)).resolves.toBe(204);

    expect(spy).toHaveBeenCalledWith(`${endpoint}/${id}`, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(deleteGuestToken(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(`${endpoint}/${id}`, expectedConfig);
  });
});
