import {
  addressId as id,
  userId,
} from 'tests/__fixtures__/addresses/index.mjs';
import { putUserDefaultShippingAddress } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/putUserDefaultShippingAddress.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('putUserDefaultShippingAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  describe('putUserDefaultShippingAddress', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success());

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
