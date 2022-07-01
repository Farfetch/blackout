import { deleteToken } from '..';
import { id } from 'tests/__fixtures__/authentication';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteTokens.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('deleteToken', () => {
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'delete');
  const endpoint = '/authentication/v1/tokens';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(deleteToken(id)).resolves.toBe(204);

    expect(spy).toHaveBeenCalledWith(`${endpoint}/${id}`, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(deleteToken(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(`${endpoint}/${id}`, expectedConfig);
  });
});
