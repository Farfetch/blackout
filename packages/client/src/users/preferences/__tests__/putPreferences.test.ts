import { putUserPreferences } from '..';
import { mockGetPreferencesResponse, userId } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putUserPreferences.fixtures';
import mswServer from '../../../../tests/mswServer';
import type { PutUserPreferencesData } from '../types';

describe('putPreferences', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(
      putUserPreferences(
        userId,
        mockGetPreferencesResponse as PutUserPreferencesData,
      ),
    ).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/preferences`,
      mockGetPreferencesResponse,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      putUserPreferences(
        userId,
        mockGetPreferencesResponse as PutUserPreferencesData,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/preferences`,
      mockGetPreferencesResponse,
      expectedConfig,
    );
  });
});
