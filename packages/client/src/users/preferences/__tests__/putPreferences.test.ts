import { mockGetPreferencesResponse, userId } from 'tests/__fixtures__/users';
import { putUserPreferences } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putUserPreferences.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('putPreferences', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetPreferencesResponse));

    await expect(
      putUserPreferences(userId, mockGetPreferencesResponse),
    ).resolves.toStrictEqual(mockGetPreferencesResponse);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/preferences`,
      mockGetPreferencesResponse,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      putUserPreferences(userId, mockGetPreferencesResponse),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/preferences`,
      mockGetPreferencesResponse,
      expectedConfig,
    );
  });
});
