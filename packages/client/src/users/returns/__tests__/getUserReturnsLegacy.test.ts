import {
  fetchUserReturnPayload,
  mockUserReturnsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { getUserReturnsLegacy } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserReturnsLegacy.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserReturnsLegacy', () => {
  const expectedConfig = undefined;

  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  describe('Authenticated User', () => {
    const expectedData = undefined;

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockUserReturnsResponse));

      await expect(getUserReturnsLegacy(userId)).resolves.toStrictEqual(
        mockUserReturnsResponse,
      );

      expect(spy).toHaveBeenCalledWith(
        `/legacy/v1/users/${userId}/returns`,
        expectedData,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(getUserReturnsLegacy(userId)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/legacy/v1/users/${userId}/returns`,
        expectedData,
        expectedConfig,
      );
    });
  });

  describe('Guest User', () => {
    const expectedData = fetchUserReturnPayload;

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockUserReturnsResponse));

      await expect(
        getUserReturnsLegacy(userId, fetchUserReturnPayload),
      ).resolves.toStrictEqual(mockUserReturnsResponse);

      expect(spy).toHaveBeenCalledWith(
        `/legacy/v1/users/${userId}/returns`,
        expectedData,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        getUserReturnsLegacy(userId, fetchUserReturnPayload),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/legacy/v1/users/${userId}/returns`,
        expectedData,
        expectedConfig,
      );
    });
  });
});
