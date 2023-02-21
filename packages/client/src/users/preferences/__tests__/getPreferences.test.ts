import {
  code,
  mockGetPreferencesResponse,
  userId,
} from 'tests/__fixtures__/users';
import { getUserPreferences } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserPreferences.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getPreferences', () => {
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
