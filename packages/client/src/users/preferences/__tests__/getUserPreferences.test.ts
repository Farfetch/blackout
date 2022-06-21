import {
  code,
  mockGetPreferencesResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { getUserPreferences } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserPreferences.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserPreferences', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetPreferencesResponse));

    await expect(getUserPreferences(userId)).resolves.toStrictEqual(
      mockGetPreferencesResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/preferences`,
      expectedConfig,
    );
  });

  it('should filter by code and handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetPreferencesResponse));

    await expect(getUserPreferences(userId, code)).resolves.toStrictEqual(
      mockGetPreferencesResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/preferences?code=${code}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserPreferences(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/preferences`,
      expectedConfig,
    );
  });

  it('should receive a client request error when filtered by code', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserPreferences(userId, code)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/preferences?code=${code}`,
      expectedConfig,
    );
  });
});
