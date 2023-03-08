import {
  mockGetPreferencesResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { putUserPreferences } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/putUserPreferences.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

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
