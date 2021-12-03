import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putPreferences.fixtures';
import moxios from 'moxios';

describe('putPreferences', () => {
  const expectedConfig = undefined;
  const data = {};
  const spy = jest.spyOn(client, 'put');
  const mockUserId = 0;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success(mockUserId);

    expect.assertions(2);

    await expect(
      usersClient.putPreferences(mockUserId, data),
    ).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${mockUserId}/preferences`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(mockUserId);

    expect.assertions(2);

    await expect(
      usersClient.putPreferences(mockUserId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${mockUserId}/preferences`,
      data,
      expectedConfig,
    );
  });
});
