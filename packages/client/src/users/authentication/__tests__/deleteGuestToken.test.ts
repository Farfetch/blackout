import { deleteGuestToken } from '..';
import { id } from 'tests/__fixtures__/authentication';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteGuestTokens.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('deleteGuestToken', () => {
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'delete');
  const endpoint = '/authentication/v1/guestTokens';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(deleteGuestToken(id)).resolves.toBe(204);

    expect(spy).toHaveBeenCalledWith(`${endpoint}/${id}`, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(deleteGuestToken(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(`${endpoint}/${id}`, expectedConfig);
  });
});
