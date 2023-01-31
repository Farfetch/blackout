import { getUserReturns } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserReturns.fixtures';
import moxios from 'moxios';

describe('getUserReturns', () => {
  const expectedConfig = undefined;
  const userId = '123456';
  const spy = jest.spyOn(client, 'get');
  const query = { page: 1 };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ userId, response, query });

    expect.assertions(2);

    await expect(getUserReturns(userId, query)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/returns?page=${query.page}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId, query });

    expect.assertions(2);
    await expect(getUserReturns(userId, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/returns?page=${query.page}`,
      expectedConfig,
    );
  });
});
