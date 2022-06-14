import { deleteUserAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteUserAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('deleteUserAddress', () => {
  const expectedConfig = undefined;
  const id = 'c9ce5410-58d9-4298-a385-231a79373e4a';
  const userId = 78910;
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
