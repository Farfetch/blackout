import { deleteTokens } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteTokens.fixtures';
import moxios from 'moxios';

describe('deleteTokens', () => {
  const id = 1;
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'delete');
  const endpoint = '/authentication/v1/tokens';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({ id });

    expect.assertions(2);

    await expect(deleteTokens(id)).resolves.toBe(204);

    expect(spy).toHaveBeenCalledWith(`${endpoint}/${id}`, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(deleteTokens(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(`${endpoint}/${id}`, expectedConfig);
  });
});
