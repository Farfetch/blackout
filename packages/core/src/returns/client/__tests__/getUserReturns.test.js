import { getUserReturns } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserReturns.fixtures';
import moxios from 'moxios';

describe('getUserReturns', () => {
  const expectedConfig = undefined;
  const userId = '123456';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ userId, response });

    expect.assertions(2);

    await expect(getUserReturns(userId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/returns`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId });

    expect.assertions(2);
    await expect(getUserReturns(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/returns`,
      expectedConfig,
    );
  });
});
