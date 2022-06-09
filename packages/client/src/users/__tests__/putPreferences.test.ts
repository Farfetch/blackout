import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putPreferences.fixtures';
import mswServer from '../../../tests/mswServer';
import type { PutPreferencesData } from '../types';

describe('putPreferences', () => {
  const expectedConfig = undefined;
  const data: PutPreferencesData = [
    {
      code: '',
      values: ['value1', 'value2'],
      groupId: '',
      updatedDate: '',
    },
  ];
  const spy = jest.spyOn(client, 'put');
  const userId = 0;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(
      usersClient.putPreferences(userId, data),
    ).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/preferences`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      usersClient.putPreferences(userId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/preferences`,
      data,
      expectedConfig,
    );
  });
});
