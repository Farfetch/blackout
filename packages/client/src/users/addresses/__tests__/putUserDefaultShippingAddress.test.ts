import { addressId as id, userId } from 'tests/__fixtures__/addresses';
import { putUserDefaultShippingAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putUserDefaultShippingAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('putUserDefaultShippingAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  describe('putUserDefaultShippingAddress', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success());

      expect.assertions(2);

      await expect(putUserDefaultShippingAddress(userId, id)).resolves.toBe(
        200,
      );
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/shipping/${id}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        putUserDefaultShippingAddress(userId, id),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/shipping/${id}`,
        expectedConfig,
      );
    });
  });
});
