import { deleteUserAddress } from '..';
import { addressId as id, userId } from 'tests/__fixtures__/addresses';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteUserAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('deleteUserAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => jest.clearAllMocks());

  describe('deleteUserAddress', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success());

      expect.assertions(2);

      await expect(deleteUserAddress({ id, userId })).resolves.toBe(200);
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(deleteUserAddress({ id, userId })).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });
  });
});
