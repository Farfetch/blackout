import { deleteUserAddress } from '../index.js';
import {
  addressId as id,
  userId,
} from 'tests/__fixtures__/addresses/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteUserAddress.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('deleteUserAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => jest.clearAllMocks());

  describe('deleteUserAddress', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success());

      await expect(deleteUserAddress({ id, userId })).resolves.toBe(200);
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(deleteUserAddress({ id, userId })).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });
  });
});
