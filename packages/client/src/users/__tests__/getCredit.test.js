import * as usersClient from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCredits.fixtures';
import moxios from 'moxios';

describe('getCredit', () => {
  const expectedConfig = undefined;
  const id = '123456';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ id, response });

    expect.assertions(2);

    await expect(usersClient.getCredit(id)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/users/${id}/credits`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(usersClient.getCredit(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/users/${id}/credits`,
      expectedConfig,
    );
  });
});
